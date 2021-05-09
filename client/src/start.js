import ReactDOM from "react-dom";
import Welcome from "./welcome";

//we only call ReactDOM.render once in the whole project
if (location.pathname == "welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<img src="#" />, document.querySelector("main"));
}

// let elem = <img src="#" />;
// if (location.pathname == "welcome") {
//     elem = <Welcome />;
// } else {
//     ReactDOM.render(elem, document.querySelector("main"));
// }
