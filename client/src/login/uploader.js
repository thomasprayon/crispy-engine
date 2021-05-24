import { Component } from "react";
import axios from "../axios";
import { Button, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("Uploader just mounted");
        console.log("props in Uploader", this.props);
    }
    handleChange({ target }) {
        console.log("handleChange working!!");
        this.setState({
            [target.name]: target.files[0],
        });
    }
    submit(e) {
        console.log("Submit working on axios uploader");
        // console.log("event: ", e);
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then((response) => {
                // console.log("response.data: ", response.data);
                const { img_url } = response.data;
                // console.log("img_url: ", img_url);
                this.props.updateProfilePic(img_url);
            })
            .catch((err) => {
                console.log("Error in POST AXIOS /upload", err);
            });
    }
    render() {
        return (
            <>
                <Container className="uploader-container bg-danger">
                    <Container className="d-flex justify-content-end pe-5">
                        <span
                            className="close-uploader"
                            onClick={this.props.toggleUploader}
                        >
                            X
                        </span>
                    </Container>

                    <Row className="d-flex justify-content-center mt-1">
                        <h2>Do you want to change your image?</h2>
                    </Row>
                    <Row className="d-flex justify-content-center mt-2">
                        <div className="upload-btn-wrapper">
                            <Button>Upload</Button>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    </Row>
                    <Row className="d-flex justify-content-center mt-3">
                        <Button onClick={(e) => this.submit(e)}>Submit</Button>
                    </Row>
                </Container>
            </>
        );
    }
}
