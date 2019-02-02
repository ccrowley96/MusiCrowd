import React, { Component } from "react";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Search from "../Search/Search";
import Player from "../Player/Player";

import "./Admin.css";
import Results from "../Results/Results";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			clearSearch: false,
			redirect: false
		};
	}

	componentDidMount = () => {
		if (this.props.access_token) {
		} else {
			this.setState({
				redirect: true
			});
		}
	};

	setResults = results => {
		this.setState({ results }, () => console.log(this.state.results));
	};

	clearSearch = () => {
		this.setState({
			results: []
		});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/" />;
		return (
			<Container>
				<Player />
				<div className="admin">
					<div>
						<Search setResults={this.setResults} />
						<Results
							results={this.state.results}
							clearSearch={this.clearSearch}
						/>
					</div>
					{/* <Queue /> */}
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
