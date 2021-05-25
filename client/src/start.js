import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./login/app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { init } from "./login/socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    init(store);
    ReactDOM.render(elem, document.querySelector("main"));
}
