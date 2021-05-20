import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }
    submit() {
        console.log("Submit working on axios login");
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                console.log("data", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div className="registration-login-container">
                {this.state.error && (
                    <p className="error">
                        Oops! Something went wrong, try again!!
                    </p>
                )}
                <div className="form-registration-login">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        onClick={() => this.submit()}
                        className="register-btn"
                    >
                        Submit
                    </button>
                    <Link to="/">Sign Up</Link>
                    <Link to="/password/reset">Forgot your Password?</Link>
                </div>
            </div>
        );
    }
}
