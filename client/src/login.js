import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state;
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
                {" "}
                <form autoComplete="off" className="form-registration-login">
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
                    <Link to="/">Sign Up</Link>
                    <Link to="/password/reset/start">Forgot your Passwor?</Link>
                </form>
            </div>
        );
    }
}
