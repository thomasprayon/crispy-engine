import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

//we only call ReactDOM.render once in the whole project
if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<Logo />, document.querySelector("main"));
}
