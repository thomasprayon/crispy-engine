import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

//we only call ReactDOM.render once in the whole project
if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<App />, document.querySelector("main"));
}
