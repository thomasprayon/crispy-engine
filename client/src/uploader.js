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
    methodInUploader() {
        this.props.updateProfilePic("Whoaaaaaa");
    }
    handleChange({ target }) {
        console.log("handleChange working!!");
        this.setState({
            [target.name]: target.files[0],
        });
    }
    submit(e) {
        console.log("Submit working on axios uploader");
        console.log("event: ", e);
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("response: ", response);
            })
            .catch((err) => {
                console.log("Error in POST AXIOS /upload", err);
            });
    }
    render() {
        return (
            <>
                <p>Uploader</p>
                <h2>Upload a profile pic </h2>
                <div>
                    <label htmlFor="file">Choose a file</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={(e) => this.submit(e)}>Submit</button>
                    <button onClick={this.props.toggleUploader}>Cancel</button>
                </div>
                <p>/Uploader</p>
            </>
        );
    }
}
