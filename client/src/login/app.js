import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Uploader from "./uploader";
import Profile from "./profile";
import Header from "./header";
import axios from "../axios";
import OtherProfile from "./other-profile";
import FindPeople from "./find-people";
import FriendsOrNot from "./friends";
import Chat from "./chat";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteUser from "./delete";

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
            // console.log("response.data", response.data);
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
                    <div className="app-container">
                        <Header
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
                        <Route
                            path="/friends-or-not"
                            component={FriendsOrNot}
                        />
                        <Route path="/chat" component={Chat} />
                        <Route path="/delete/user" component={DeleteUser} />
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
