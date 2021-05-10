import { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
    }
    submit() {
        console.log("submit working!");
        axios
            .post("/registration", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                if (data.sucess) {
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
            <div className="registration-container">
                <form
                    method="POST"
                    autocomplete="off"
                    className="form-registration"
                >
                    <h3>Register here</h3>
                    {this.state.error && (
                        <p className="error">
                            Oops! Something went wrong, try again!!
                        </p>
                    )}
                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label for="lastName">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label for="lastName">Password</label>
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
                <p>
                    Already a member? <a href="#">Log in</a>
                </p>
            </div>
        );
    }
}
