import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
        console.log("handleChange happening");
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div className="my-3">
                {this.state.error && (
                    <p className="error">
                        Oops! Something went wrong, try again!!
                    </p>
                )}
                <div className="row g-3 align-items-center">
                    <div className="row-auto">
                        <label
                            htmlFor="email"
                            className="col-form-label text-white d-flex justify-content-center"
                        >
                            Email
                        </label>
                        <div className="row-auto">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="off"
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="row-auto">
                            <label
                                htmlFor="password"
                                className="col-form-label text-white d-flex justify-content-center"
                            >
                                Password
                            </label>
                        </div>
                        <div className="row-auto">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="off"
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="row d-flex justify-content-center mt-3">
                            <Button type="submit" onClick={() => this.submit()}>
                                Submit
                            </Button>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Link to="/">Sign up</Link>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Link to="/password/reset">
                                Forgot your Password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
