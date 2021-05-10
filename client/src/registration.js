import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div className="registration-login-container">
                <form
                    method="POST"
                    autoComplete="off"
                    className="form-registration-login"
                >
                    <h3>Register here</h3>
                    {this.state.error && (
                        <p className="error">
                            Oops! Something went wrong, try again!!
                        </p>
                    )}
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="lastName">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="lastName">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        onClick={() => this.submit()}
                        className="register-btn"
                    >
                        Submit
                    </button>
                </form>
                <Link to="/login">Already a member? Log in!</Link>
            </div>
        );
    }
}
