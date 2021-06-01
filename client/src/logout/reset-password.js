import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
        // console.log("Event: ", e);

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
                    <div className="my-3 log-anim">
                        {this.state.error && (
                            <p className="text-warning d-flex justify-content-center">
                                Oops! Something went wrong, try again!!
                            </p>
                        )}
                        <h3 className="text-white row d-flex justify-content-center">
                            Please enter your email to change password
                        </h3>
                        <div className="col mt-5">
                            <div className="row  d-flex justify-content-center">
                                <label
                                    htmlFor="email"
                                    className="col-form-label text-dark d-flex justify-content-center"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="form-control"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div className="row d-flex justify-content-between my-5">
                                <div className="col d-flex justify-content-center">
                                    <Button
                                        type="submit"
                                        onClick={(e) => this.submitEmail(e)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <Link
                                            to="/login"
                                            className="text-white"
                                            id="link-find-white"
                                        >
                                            Go Back
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <div className="my-3 log-anim">
                    {this.state.error && (
                        <p className="text-warning d-flex justify-content-center">
                            Oops! Something went wrong, try again!!
                        </p>
                    )}
                    <div className="row g-3 d-flex justify-content-center">
                        <label
                            htmlFor="code"
                            className="col-form-label text-dark "
                        >
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="form-control"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className="row g-3 align-items-center">
                        <label
                            htmlFor="password"
                            className="col-form-label text-dark d-flex justify-content-center"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className="row d-flex justify-content-center mt-4">
                        <Button
                            type="submit"
                            onClick={(e) => this.submitEmail(e)}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h1 className="text-dark mt-2">
                        You have successfully reset your password
                    </h1>
                    <Button className="mt-2 d-flex justify-content-center">
                        <Link to="/login">Log in!</Link>
                    </Button>
                </div>
            );
        }
    }
    render() {
        return <div>{this.determineViewToRender()}</div>;
    }
}
