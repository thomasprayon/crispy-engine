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
                <Container className="bg-white mt-5 profile-container d-flex-justify-content-center">
                    <Row className="d-flex-align-items-center mt-4">
                        <Col xs lg="2">
                            <img
                                src={this.state.imgUrl}
                                alt={`${this.state.firstName} ${this.state.lastName}`}
                                className="profile-img"
                            />
                        </Col>
                        <Col>
                            <Row>
                                <h2>
                                    {this.state.firstName} {this.state.lastName}
                                </h2>
                            </Row>
                            <Row>
                                <p>{this.state.bio}</p>
                            </Row>
                            <Row>
                                <FriendButton
                                    viewerId={this.props.match.params.id}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
