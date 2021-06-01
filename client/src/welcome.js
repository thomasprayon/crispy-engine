import Registration from "./logout/registration";
import Login from "./logout/login";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./login/logo";
import ResetPassword from "./logout/reset-password";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Welcome() {
    return (
        <>
            <div className="welcome-container">
                <div className="container logo-content d-flex justify-content-center d-flex align-items-center">
                    <Logo />
                </div>
                <div className="container registration-login-content d-flex justify-content-center d-flex align-items-center">
                    <HashRouter>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/password/reset"
                            component={ResetPassword}
                        />
                    </HashRouter>
                </div>
            </div>
        </>
    );
}
