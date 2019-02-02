import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const routes = (
	<Router onUpdate={() => window.scrollTo(0, 0)}>
		<App />
	</Router>
);

export default routes;
