import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextArea: false,
            draftBio: "",
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
        });
    }

    submitBio(e) {
        // console.log("event submit bio", e);
        e.preventDefault();
        console.log("this.state", this.state);
        console.log("this.state.draftBio", this.state.draftBio);
        axios
            .post("/update-bio", {
                bio: this.state.draftBio,
            })
            .then((response) => {
                console.log("response.data", response.data);
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
                {!this.props.bio && (
                    <>
                        <p></p>
                        <a
                            className="addBio-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Add bio
                        </a>
                    </>
                )}
                {this.props.bio && (
                    <>
                        <p>{this.props.bio}</p>
                        <button onClick={() => this.toggleBio()}>
                            Edit bio
                        </button>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button onClick={(e) => this.submitBio(e)}>
                            Submit
                        </button>
                        <button onClick={(e) => this.toggleBio(e)}>
                            Cancel
                        </button>
                    </>
                )}
            </>
        );
    }
}
