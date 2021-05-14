import { Component } from "react";
import axios from "axios";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextArea: false,
        };
    }
    handleChange({ target }) {
        // console.log("target", target);
        this.setState({
            [target.name]: target.value,
        });
    }
    toggleBio() {
        console.log("toggleBio is here");
        this.setState({
            showTextArea: !this.state.showTextArea,
        });
    }
    submitBio(e) {
        console.log("event submit bio", e);
        e.preventDefault();
        console.log("this.state", this.state);
        axios
            .post("/update-bio", {
                bio: this.state.bio,
            })
            .then((response) => {
                console.log("response", response);
            })
            .catch((err) => {
                console.log("Error in Axios /update-bio", err);
            });
    }
    render() {
        return (
            <>
                <p>Bio-editor</p>
                {!this.props.bio && (
                    <button onClick={() => this.toggleBio()}>Add bio</button>
                )}
                {this.props.bio && (
                    <>
                        <p>{this.props.bio}</p>
                        <button onClick={() => this.toggleBio}>Edit bio</button>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <textarea
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button onClick={(e) => this.submitBio(e)}>
                            Submit
                        </button>
                    </>
                )}
            </>
        );
    }
}
