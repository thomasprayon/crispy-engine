import { Component } from "react";
import Logo from "./logo";
import Uploader from "./uploader";
import ProfilePic from "./profile-pic";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            imgUrl: null,
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted!");
    }
    toggleUploader() {
        console.log("toggleUploader is here!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    updateProfilePic(imgUrl) {
        console.log("I'm running in App");
        console.log("argument methodInApp got passed:", imgUrl);
        console.log(
            "toggleUploader is here in UpdateProfilePic ",
            this.toggleUploader
        );
    }
    render() {
        return (
            <>
                <div className="main-container">
                    <ProfilePic
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={this.state.imgUrl || "/images/user_default.png"}
                        toggleUploader={this.toggleUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader updateProfilePic={this.updateProfilePic} />
                    )}
                </div>
            </>
        );
    }
}
