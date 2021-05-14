import { Component } from "react";
import axios from "axios";

export default class BioEditor extends Component {
    constructor(){
        super();
        this.state= {
            showTextArea = false
        }
    }
    componentDidMount(){
        console.log("Bio-editor just mounted!!");
    }
    handleChange({target}){
        console.log("target", target);
        this.setState({
            [target.name]: target.value
        })
    }
    toggleBio(){
        console.log("toggleBio is here")
        this.setState({
            showTextArea: !this.state.showTextArea
        })
    }
    submitBio(e){
        console.log("event submit bio", e)
        e.preventDefault();


    }
    render(){
        return (
            <>
            <h1>Bio-editor</h1>
            <textarea onChange={(e) => this.handleChange(e)}></textarea>
            <button onClick={(e) => this.submit(e)}>Submit</button>
            </>
        )
    }
}
