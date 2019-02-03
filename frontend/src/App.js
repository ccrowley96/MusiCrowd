import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Admin from "./components/Admin/Admin";
import Room from "./components/Room/Room";
import TvMode from "./components/TvMode/TvMode";

import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="App">
				{/* <Header /> */}
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/admin" component={Admin} />
					<Route path="/room" component={Room} />
					<Route path="/tvmode" component={TvMode} />
				</Switch>
			</div>
		);
	}
}
export default withRouter(App);
