import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./logo";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <h1>Welcome to ExpChange</h1>
            <Logo />
            <h3>Where you can exchange you're knowledge with others</h3>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
