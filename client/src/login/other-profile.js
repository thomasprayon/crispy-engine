import { Component } from "react";
import axios from "../axios";
import FriendButton from "./friend-button";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("Other Profile is mounted!!");
        const id = this.props.match.params.id;
        // console.log("this.props.match.params.id", id);
        axios
            .get(`/other-user/${id}`)
            .then((response) => {
                // console.log("response in other-prof: ", response.data);
                const { data } = response;
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            })
            .catch((err) => {
                console.log("Error in /other-profile/:id", err);
                this.props.history.push("/");
            });
    }
    render() {
        return (
            <>
                <div className="profile-container background mt-5">
                    <Row>
                        <Col className="d-flex justify-content-center mt-3">
                            <img
                                src={
                                    this.state.imgUrl ||
                                    "/images/user_default.png"
                                }
                                alt={`${this.state.firstName} ${this.state.lastName}`}
                                className="profile-img"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h2 className="text-capitalize">
                                {this.state.firstName} {this.state.lastName}
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center m-2">
                                <p className="text-dark text-center">
                                    {this.state.bio}
                                </p>
                            </div>
                            <Row className="d-flex justify-content-center">
                                <FriendButton
                                    viewerId={this.props.match.params.id}
                                />
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
