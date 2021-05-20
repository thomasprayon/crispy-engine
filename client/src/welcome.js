import Registration from "./logout/registration";
import Login from "./logout/login";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./login/logo";
import ResetPassword from "./logout/reset-password";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <Logo />
            <h3>Where you can exchange your knowledge with others</h3>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
