import ReactDOM from "react-dom";
import Welcome from "./welcome";

//we only call ReactDOM.render once in the whole project
if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(
        <h1>Working in progress</h1>,
        document.querySelector("main")
    );
}
