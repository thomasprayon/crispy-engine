import { Component } from "react";
import axios from "./axios";

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
                <div className="uploader-container">
                    <span
                        onClick={this.props.toggleUploader}
                        className="close-span"
                    >
                        X
                    </span>
                    <div className="uploader-content">
                        <h2>Do you want to change your image?</h2>
                        <div class="upload-btn-wrapper">
                            <button className="btn">Upload</button>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>

                        <button onClick={(e) => this.submit(e)} className="btn">
                            Submit
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
