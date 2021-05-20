import { Component } from "react";
import axios from "../axios";

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
                        <button
                            className="edit-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Edit bio
                        </button>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <div>
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
                        </div>
                    </>
                )}
            </>
        );
    }
}
