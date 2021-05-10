// import { Counter } from "./counter";

// // function component
// // presentational/dumb - function components are used to show stuff
// // you can't have logic in function components
// // function HelloWorld() {
// //     //JSX
// //     return <div>Hello, World!</div>;
// // }
// export default function HelloWorld() {
//     const last = "prayon";
//     return (
//         <div>
//             Hello, World!
//             {/* the left hand side is the name of the prop. you can call the prop whatever you like */}
//             {/* the right hand side is the value you'repassing to the child component. */}
//             <Counter snow={last} />
//         </div>
//     );
// }

// //class components
// //components that can have logic
// // if you ae a component that the user can interect with, then you'll want a class component
// // class HelloWorld extends Component {
// //     constructor() {
// //         super();
// //     }
// //     render() {
// //         return <div>Hello, World</div>;
// //     }
// // }

// //PART 2 SN
// const csurf = require("csurf");

// //cookie session
// app.use(csurf());

// app.use(function (req, res, next) {
//     const token = req.csrfToken();
//     console.log("token: ", token);
//     res.cookie("mytoken", token);
//     next();
// });
// //url enconded

// //we need to add a file in client/src where we call it axios.js
// // import axios from "axios";
// var instance = axios.create({
//     xsrfCookieName: "mytoken",
//     xsrfHeaderName: "csrf-token",
// });

// export default instance;

// //REACT ROUTER
// //HASH ROUTER
