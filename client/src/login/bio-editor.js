import { Component } from "react";
import axios from "../axios";
import { Button, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextArea: false,
            draftBio: "",
            showButtons: true,
        };
    }
    handleChange({ target }) {
        // console.log("target", target);
        console.log("target", target.name);
        this.setState({
            draftBio: target.value,
        });
    }
    toggleBio() {
        console.log("toggleBio is here");
        this.setState({
            showTextArea: !this.state.showTextArea,
            showButtons: !this.state.showButtons,
        });
    }
    submitBio(e) {
        // console.log("event submit bio", e);
        e.preventDefault();
        // console.log("this.state", this.state);
        // console.log("this.state.draftBio", this.state.draftBio);
        if (!this.state.draftBio) {
            this.toggleBio();
            return;
        }
        axios
            .post("/update-bio", {
                bio: this.state.draftBio,
            })
            .then((response) => {
                // console.log("response.data", response.data);
                const { bio } = response.data;
                this.props.setBio(bio);
                this.toggleBio();
            })
            .catch((err) => {
                console.log("Error in Axios /update-bio", err);
            });
    }
    render() {
        return (
            <>
                {!this.props.bio && this.state.showButtons && (
                    <>
                        <a
                            className="addBio-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Add bio
                        </a>
                    </>
                )}
                {this.props.bio && this.state.showButtons && (
                    <>
                        <p>{this.props.bio}</p>
                        <a
                            className="edit-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Edit bio
                        </a>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <div className="bio-text-area">
                            <textarea
                                className="form-control"
                                rows="2"
                                placeholder="Write something about yourself..."
                                defaultValue={this.props.bio}
                                onChange={(e) => this.handleChange(e)}
                            ></textarea>
                            <Row className="d-flex align-items-center mt-3">
                                <Col className="d-flex justify-content-end">
                                    <Button onClick={(e) => this.submitBio(e)}>
                                        Submit
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={(e) => this.toggleBio(e)}>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </>
                )}
            </>
        );
    }
}
