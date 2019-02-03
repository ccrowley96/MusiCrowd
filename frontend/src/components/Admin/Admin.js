import React, { Component } from "react";
import axios from "axios";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import { Container, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTv
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Search/Search";
import Player from "../Player/Player";
import Queue from "../Queue/Queue";

import "./Admin.css";
import Results from "../Results/Results";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			roomCreated: false,
			redirect: false,
			partyCode: undefined,
			currentlyPlaying: undefined,
			started: false,
			queue: []
		};
	}

	componentDidMount = () => {
		if (this.props.access_token) {
			let payload = { token: this.props.access_token };
			axios
				.post(`/api/create_room`, payload)
				.then(response => {
					this.setState({
						roomCreated: true,
						partyCode: response.data.party_code
					});
				})
				.catch(err => console.log(err));
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

	loadSong = song => {
		console.log(this.state.partyCode);
		axios
			.get(`/api/nextsong/${this.state.partyCode}`)
			.then(res => {
				// console.log(res.data);
				this.setState({
					currentlyPlaying: res.data.uri
				});
			})
			.catch(err => console.log(err));
	};

	setQueue = queue => {
		this.setState({
			queue
		});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/" />;
		if (!this.state.roomCreated)
			return (
				<div>
					<p>loading...</p>
				</div>
			);
		return (
			<Container className="playerContainer">
				<Player
					currentlyPlaying={this.state.currentlyPlaying}
					loadSong={this.loadSong}
				/>
				<div style={{ height: "80px", marginTop: "30px" }}>
					{!this.state.started && this.state.queue.length !== 0 && (
						<Button
							className="startSessionButton"
							onClick={() => {
								this.loadSong();
								this.setState({
									started: true
								});
							}}
						>
							start session
						</Button>
					)}
					<a
						href={`https://musicrowd.herokuapp.com/tvmode?=${
							this.state.partyCode
						}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faTv} size={"3x"}/>
					</a>
				</div>
				<div className="roomCode">
				<h4>
					<b>Party Code: </b>{this.state.partyCode}
				</h4>
				</div>
				<div className="admin">
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
						options={true}
						partyCode={this.state.partyCode}
					/>
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
