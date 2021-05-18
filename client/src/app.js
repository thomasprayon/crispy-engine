import { Component } from "react";
import Uploader from "./uploader";
import ProfilePic from "./profile-pic";
import Profile from "./profile";
import NavBar from "./nav-bar";
import axios from "./axios";
import OtherProfile from "./other-profile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./find-people";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted!");
        axios.get("/user").then((response) => {
            console.log("response.data", response.data);
            this.setState({
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                imgUrl: response.data.img_url,
                bio: response.data.bio,
            });
        });
    }
    toggleUploader() {
        console.log("toggleUploader is here!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    updateProfilePic(imgUrl) {
        console.log("I'm running in App");
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }
    setBio(newBio) {
        console.log("I'm running in App");
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <div className="main-container">
                        <header>
                            <img
                                src="/images/part1Crop.png"
                                alt="logo"
                                className="logo-header"
                            />
                        </header>
                        <NavBar
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                        />
                        <ProfilePic
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            imgUrl={
                                this.state.imgUrl || "/images/user_default.png"
                            }
                            toggleUploader={this.toggleUploader}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    imgUrl={
                                        this.state.imgUrl ||
                                        "/images/user_default.png"
                                    }
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/find/user" component={FindPeople} />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateProfilePic={this.updateProfilePic}
                                toggleUploader={this.toggleUploader}
                            />
                        )}
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
