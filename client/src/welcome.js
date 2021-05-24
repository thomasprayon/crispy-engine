import Registration from "./logout/registration";
import Login from "./logout/login";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./login/logo";
import ResetPassword from "./logout/reset-password";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";

export default function Welcome() {
    return (
        <>
            <div className="welcome-container bg-dark">
                <div className="d-flex justify-content-center">
                    <Container>
                        <Row className="d-flex justify-content-center my-3">
                            <Logo />
                        </Row>
                        <Row className="d-flex justify-content-center mt-4">
                            <h3 className="text-white mb-3">
                                Where you can exchange your knowledge with
                                others
                            </h3>
                        </Row>
                        <Row className="d-flex justify-content-center my-2">
                            <HashRouter>
                                <Route
                                    exact
                                    path="/"
                                    component={Registration}
                                />
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/password/reset"
                                    component={ResetPassword}
                                />
                            </HashRouter>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}
