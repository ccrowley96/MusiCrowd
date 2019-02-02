import React, { Component } from "react";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Search from "../Search/Search";
import Player from "../Player/Player";

import "./Admin.css";
import Results from "../Results/Results";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		};
	}

	setResults = results => {
		this.setState({ results }, () => console.log(this.state.results));
	};

	render() {
		return (
			<Container>
				<Player />
				<div className="admin">
					<div>
						<Search setResults={this.setResults} />
						<Results results={this.state.results} />
					</div>
				</div>
			</Container>
		);
	}
}

const actions = { setAccessToken, setSearchResults };

const mapStateToProps = (state, ownProps) => {
	return {
		access_token: state.data.data.access_token,
		search_results: state.data.data.search_results
	};
};

export default connect(
	mapStateToProps,
	actions
)(Admin);
