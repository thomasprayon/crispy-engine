import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
    }
    submit() {
        console.log("Submit working on axios registration!");
        axios
            .post("/registration", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
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
        console.log("handleChange is happening!");
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div className="my-3 log-anim">
                <h3 className="text-dark row d-flex justify-content-center">
                    Register here
                </h3>
                {this.state.error && (
                    <p className="error">
                        Oops! Something went wrong, try again!!
                    </p>
                )}
                <div className="row g-3 align-items-center">
                    <div className="col m-2">
                        <label
                            htmlFor="firstName"
                            className="col-form-label text-dark d-flex justify-content-center"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            autoComplete="off"
                            onChange={(e) => this.handleChange(e)}
                            className="form-control"
                        />
                    </div>
                    <div className="col m-2">
                        <label
                            htmlFor="lastName"
                            className="col-form-label text-dark d-flex justify-content-center"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            autoComplete="off"
                            onChange={(e) => this.handleChange(e)}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col m-2">
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
                    <div className="col m-2">
                        <label
                            htmlFor="password"
                            className="col-form-label text-dark d-flex justify-content-center"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            className="form-control"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-3">
                    <Button type="submit" onClick={() => this.submit()}>
                        Submit
                    </Button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <Button>
                        <Link to="/login" id="link-light">
                            Log in
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}
