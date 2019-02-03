import React, { Component } from "react";
import Search from "../Search/Search";
import { setAccessToken } from "../../actions/dataAction";
import Results from "../Results/Results";
import Queue from "../Queue/Queue";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { Container } from "reactstrap";
import "./Room.css";

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			access_token: "",
			partyCode: undefined,
			queue: [],
			currentlyPlaying: undefined
		};
	}

	componentDidUpdate = () => {
		this.apiRefresh();
	};

	apiRefresh = () => {
		setTimeout(() => {
			axios
				.get(`/api/currently_playing/${this.state.partyCode}`)
				.then(res => {
					this.setState(
						{
							currentlyPlaying: res.data
						},
						console.log(res.data)
					);
				});
		}, 500);
	};

	componentDidMount = () => {
		var code = this.props.history.location.search.split("=")[1];
		this.setState(
			{
				partyCode: code
			},
			() => {
				axios.get(`/api/room/${this.state.partyCode}`).then(res => {
					this.setState(
						{
							access_token: res.data.token
						},
						() => {
							console.log(this.state.access_token);
							this.props.setAccessToken(this.state.access_token);
						}
					);
				});
				axios
					.get(`/api/currently_playing/${this.state.partyCode}`)
					.then(res => {
						this.setState(
							{
								currentlyPlaying: res.data
							},
							this.apiRefresh()
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
		var trackImage = "http://media.tumblr.com/tumblr_mf3r1eERKE1qgcb9y.jpg";
		var trackName = "N/A";
		var artistName = "N/A";

		if (this.state.currentlyPlaying) {
			trackImage = this.state.currentlyPlaying.album.images[0].url;
			trackName = this.state.currentlyPlaying.name;
			artistName = this.state.currentlyPlaying.album.artists[0].name;
		}

		return (
			<Container className="playerContainer">
				<div className="room-player">
					<img src={trackImage} alt="song playing" />
					
					<div>
						<h3>{trackName}</h3>
						<h5>{artistName}</h5>
					</div>
				</div>
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
