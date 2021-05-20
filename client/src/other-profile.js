import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friend-button";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("Other Profile is mounted!!");
        const id = this.props.match.params.id;
        // console.log("this.props.match.params.id", id);
        axios
            .get(`/other-user/${id}`)
            .then((response) => {
                // console.log("response in other-prof: ", response.data);
                const { data } = response;
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            })
            .catch((err) => {
                console.log("Error in /other-profile/:id", err);
                this.props.history.push("/");
            });
    }
    render() {
        return (
            <>
                <div className="profile-container">
                    <div className="img-profile">
                        <img
                            src={this.state.imgUrl}
                            alt={`${this.state.firstName} ${this.state.lastName}`}
                            className="profile-img"
                        />
                    </div>
                    <div className="info-profile">
                        <h2>
                            {this.state.firstName} {this.state.lastName}
                        </h2>
                        <p>{this.state.bio}</p>
                        <div>
                            <FriendButton
                                viewerId={this.props.match.params.id}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
