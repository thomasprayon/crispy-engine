import { Component } from "react"
import axios from axios;

export default class Registration extends Component{
    constructor(props){
        super(props)
        this.state = {};
    }
    submit(){
        console.log("submit working!");
        axios.post("/registration", {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then(({data}) => {
            // res.json({sucess:true / false})
            if(data.sucess){
                location.replace('/');
            } else {
                this.setState({
                    error: true
                })
            }
        })
    }
    handleChange({target}){
        this.setState({
            [target.name]: target.value
        })
    }
    render(){
        return (
        <div>
            {this.state.error && <div className="error">Oops! Sorry</div>}
            <input name="first-name" onChange={(e) => this.handleChange(e)} />
            <input name="last-name" onChange={(e) => this.handleChange(e)} />
            <input name="email" onChange={(e) => this.handleChange(e)} />
            <input name="password" onChange={(e) => this.handleChange(e)} />
            <button onClick={() => this.submit()}>Submit</button>
        </div>
    ); 
}
} 