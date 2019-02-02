import React, { Component } from "react";
import axios from 'axios';
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
			roomCreated: false,
			redirect: false,
			partyCode: undefined
		};
	}

	componentDidMount = () => {
		if (this.props.access_token) {
			let payload = {token: this.props.access_token};
			axios.post(`/api/create_room`, payload )
			.then((response) => {
				console.log('response',response);
				this.setState({roomCreated: true, partyCode: response.data.party_code});
			})
			.catch((err) => console.log(err))
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
		if (!this.state.roomCreated) return <div><p>loading...</p></div>;
		return (
			<Container>
				<Player />
				<div className="admin">
					<div>
						<Search setResults={this.setResults} />
						<Results
							results={this.state.results}
							partyCode={this.state.partyCode}
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
