import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
        };
    }
    handleChange({ target }) {
        // console.log("target", target);
        this.setState({
            [target.name]: target.value,
        });
    }
    submitEmail(e) {
        console.log("Submit working on Reset Password!");
        console.log("Event: ", e);

        e.preventDefault();

        this.setState({
            error: null,
        });

        if (this.state.view === 1) {
            axios
                .post("/password/reset/start", {
                    email: this.state.email,
                })
                .then(() => {
                    this.setState({
                        view: 2,
                    });
                })
                .catch((err) => {
                    console.log(
                        "Error in axios POST /password/reset/start",
                        err
                    );
                    this.setState({
                        error: true,
                    });
                });
        } else if (this.state.view === 2) {
            // console.log("AXIOS POST taking place view 2");
            axios
                .post("/password/reset/verify", {
                    email: this.state["email"],
                    password: this.state["password"],
                    code: this.state["code"],
                })
                .then(() => {
                    this.setState({
                        view: 3,
                    });
                })
                .catch((err) => {
                    console.log(
                        "Error in axios POST password/reset/verify",
                        err
                    );
                    this.setState({
                        error: true,
                    });
                });
        }
    }
    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <>
                    <div className="reset-password-container">
                        {this.state.error && (
                            <p className="error">
                                Oops! Something went wrong, try again!!
                            </p>
                        )}
                        <h3>Please enter your email to change password</h3>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            onClick={(e) => this.submitEmail(e)}
                            className="register-btn"
                        >
                            Submit
                        </button>
                    </div>
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    {this.state.error && (
                        <p className="error">
                            Oops! Something went wrong, try again!!
                        </p>
                    )}
                    <label htmlFor="code">Verification Code</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        onClick={(e) => this.submitEmail(e)}
                        className="register-btn"
                    >
                        Submit
                    </button>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h1> you successfully reset your password</h1>
                    <Link to="/login">Log in!</Link>
                </div>
            );
        }
    }
    render() {
        return <div>{this.determineViewToRender()}</div>;
    }
}
