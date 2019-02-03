import React, { Component } from "react";
import { InputGroup, Input } from "reactstrap";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

import "./Search.css";

const spotifyApi = new SpotifyWebApi();

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: undefined
		};
	}

	componentDidMount = () => {
		if (this.props.access_token !== undefined)
			spotifyApi.setAccessToken(this.props.access_token);
		
	};

	handleSearch = e => {
		this.setState(
			{
				searchTerm: e.target.value
			},
			() => {
				var local_this = this;
				if (this.state.searchTerm === "") {
					local_this.props.setResults([]);
				} else {
					spotifyApi.searchTracks(this.state.searchTerm).then(
						function(data) {
							local_this.props.setResults(data.tracks.items);	
						},
						function(err) {
							console.error(err);
						}
					);
				}
			}
		);
	};

	render() {
		return (
			<div className="search">
				<h1>Search Song</h1>
				<InputGroup className="inpgroup">
					<Input
						placeholder="search song"
						defaultValue={this.state.searchTerm}
						onChange={this.handleSearch}
					/>
				</InputGroup>
			</div>
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
)(Search);
