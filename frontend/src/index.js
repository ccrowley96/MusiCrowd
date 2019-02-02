import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

const App = <Provider store={store}>{routes}</Provider>;

ReactDOM.render(App, document.getElementById("root"));
serviceWorker.unregister();
