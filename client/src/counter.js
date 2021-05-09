// import { Component } from "react";
// import axios from "axios";

// // class components allos us to use somethig called "state"
// // "state" is the React equivalent of Vue's "data"
// // class can have state. functio omponents canothave state
// // class components can also have lifecycle methods.
// // in Vue the lifecycle method we user was called "mounted"
// // In React that method is called componentdidMount
// export class Counter extends Component {
//     constructor() {
//         super();
//         //state is always an object
//         this.state = {
//             first: "thomas",
//             currentCount: 0,
//         };
//     }
//     componentDidMount() {
//         console.log("my component mounted");
//         //axios.request
//         // axios
//         //     .get("/some-path")
//         //     .then((response) => {
//         //         console.log("response", response);
//         //     })
//         //     .catch((err) => {
//         //         console.log("Error in GET /some-path: ", err);
//         //     });
//         // you must use this.setState to update state
//         // setState always takes an object as its argument
//         this.setState({
//             first: "Marjoram",
//         });
//     }

//     handleClick() {
//         console.log("handle click is running");
//         //setState is to update state
//         // when we add a method -> this losses its value. Solution: arrow function syntax

//         this.setState({
//             currentCount: this.state.currentCount + 1,
//         });
//     }

//     render() {
//         console.log("this.state in Counter", this.state);
//         return (
//             <div>
//                 <h1>
//                     Hi, {this.state.first}
//                     {this.props.snow}
//                 </h1>
//                 <h3>{this.state.currentCount}</h3>
//                 <button onClick={() => this.handleClick()}>
//                     Click to Increment
//                 </button>
//             </div>
//         );
//     }
// }
