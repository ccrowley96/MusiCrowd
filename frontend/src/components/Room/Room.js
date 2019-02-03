import React, { Component } from "react";
import Search from "../Search/Search";
import { setAccessToken } from "../../actions/dataAction";
import Results from "../Results/Results";
import Queue from "../Queue/Queue";
import Player from "../Player/Player";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { Container } from "reactstrap";
import "./Room.css";

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomCode: "",
			results: [],
			access_token: "",
			partyCode: undefined,
			queue: []
		};
	}

	componentDidMount = () => {
		var code = this.props.history.location.search.split("=")[1];
		this.setState(
			{
				partyCode: code
			},
			() => {
				axios.get(`/api/room/${this.state.roomCode}`).then(res => {
					this.setState(
						{
							access_token: res.data.token
						},
						() => this.props.setAccessToken(this.state.access_token)
					);
				});
			}
		);
	};

	setResults = results => {
		this.setState({ results }, () => console.log(this.state.results));
	};

	clearSearch = () => {
		this.setState({
			results: []
		});
	};

	setQueue = queue => {
		this.setState({
			queue
		});
	};

	render() {
		return (
			<Container className="playerContainer">
				<Player
					currentlyPlaying={this.state.currentlyPlaying}
					loadSong={this.loadSong}
					options={false}
				/>
				<div className="room">
					<div>
						<Search setResults={this.setResults} />
						<Results
							results={this.state.results}
							partyCode={this.state.partyCode}
							clearSearch={this.clearSearch}
						/>
					</div>
					<Queue
						setQueue={this.setQueue}
						options={false}
						partyCode={this.state.partyCode}
					/>
				</div>
			</Container>
		);
	}
}

const actions = { setAccessToken };

const mapStateToProps = (state, ownProps) => {
	return {
		access_token: state.data.data.access_token
	};
};

export default connect(
	mapStateToProps,
	actions
)(Room);
