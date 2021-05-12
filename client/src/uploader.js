import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("Uploader just mounted");
        console.log("props in Uploader", this.props);
    }
    methodInUploader() {
        this.props.methodInApp("Whoaaaaaa");
    }
    render() {
        return (
            <>
                <h2>Hi I am the uploader ⏫ </h2>
                <h2 onClick={() => this.methodInUploader()}>
                    {" "}
                    🔘 Click here to run the method in Uploader that triggers
                    the one in app to run 🏃‍♀️
                </h2>
            </>
        );
    }
}
