import { Component } from "react";
import Logo from "./logo";
import Uploader from "./uploader";
import ProfilePic from "./profile-pic";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "Thomas",
            lastName: "Prayon",
            imgUrl: null,
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        // we are binding this for toggleUploader because of how
        // we reference the method in our render function
    }
    componentDidMount() {
        console.log("App just mounted!");
        // this is where we will want to make an axios request to our server,
        // to get information about the user that just logged in!
        // We'll want to store that user's info in App's state!
    }
    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    methodInApp(arg) {
        console.log("I'm running in App");
        console.log("argument methodInApp got passed:", arg);
    }
    render() {
        return (
            <>
                <header>
                    <Logo />
                    <h1>Hello I am App :D</h1>
                </header>
                <div className="main-container">
                    {/* below we are passing information from App to Xmpl via props,
                    left hand side sets the name of the prop in the chid component 
                    you are free to choose what you want right hand side sets the value!
                    that you pass on! */}
                    <ProfilePic
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={this.state.imgUrl || "/images/user_default.png"}
                    />
                    <button onClick={this.toggleUploader}>
                        Change state with a method: toggleUploader
                        {this.state.uploaderIsVisible && "🐵"}
                        {!this.state.uploaderIsVisible && "🙈"}
                    </button>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </div>
            </>
        );
    }
}
