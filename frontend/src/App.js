import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import Admin from "./components/Admin/Admin";
import Room from "./components/Room/Room";
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
				</Switch>
			</div>
		);
	}
}

const actions = {};

const mapStateToProps = (state, ownProps) => {
	return {};
};

export default withRouter(
	connect(
		mapStateToProps,
		actions
	)(App)
);
