import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretUp,
	faCaretDown,
	faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";
import "./SongTemplate.css";

export default class SongTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vote: 0,
			voteBlock: false
		};
	}

	onVote(vote_button) {
		this.setState({ voteBlock: true });
		let vote_to_send = 0;
		let local_vote_to_update = 0;

		if (vote_button === 1) {
			//upvote pressed
			if (this.state.vote === 0) {
				// Upvote should highlight
				vote_to_send = 1;
				local_vote_to_update = 1;
			} else if (this.state.vote === -1) {
				// upvote should highlight
				vote_to_send = 2;
				local_vote_to_update = 1;
			} else if (this.state.vote === 1) {
				// Unhighlight upvote
				vote_to_send = -1;
				local_vote_to_update = 0;
			}
		} else if (vote_button === -1) {
			if (this.state.vote === 0) {
				// downvote should highlight
				vote_to_send = -1;
				local_vote_to_update = -1;
			} else if (this.state.vote === 1) {
				//downvote should highlight
				vote_to_send = -2;
				local_vote_to_update = -1;
			} else if (this.state.vote === -1) {
				// Downvote should unhighlight
				vote_to_send = 1;
				local_vote_to_update = 0;
			}
		}

		let payload = {
			vote: vote_to_send,
			party_code: this.props.partyCode,
			song_id: this.props.song.id // This should either pass entire song object or just the ID
		};

		console.log("vote to send: ", vote_to_send);

		axios
			.post(`/api/vote`, payload)
			.then(res => {
				if (res.status === 200) {
					this.setState({
						vote: local_vote_to_update,
						voteBlock: false
					});
				}
			})
			.catch(err => console.log(err));
	}

	onDelete() {
		let payload = {
			party_code: this.props.partyCode,
			song: this.props.song
		};
		axios
			.post(`/api/remove_song`, payload)
			.then(res => {
				if (res.status === 200) {
					this.setState({ refreshed: true });
				}
			})
			.catch(err => console.log(err));
	}

	renderVoter() {
		if (this.props.voterFlag) {
			return (
				<div className="voter">
					<span>
						<h3 className="voteCount">{this.props.votes}</h3>
						<FontAwesomeIcon
							icon={faCaretUp}
							onClick={
								this.state.voteBlock
									? undefined
									: () => this.onVote(1)
							}
							size={"4x"}
							style={
								this.state.vote === 1
									? { color: "Aqua" }
									: undefined
							}
						/>
						<FontAwesomeIcon
							icon={faCaretDown}
							onClick={
								this.state.voteBlock
									? undefined
									: () => this.onVote(-1)
							}
							size={"4x"}
							style={
								this.state.vote === -1
									? { color: "red" }
									: undefined
							}
						/>
					</span>
				</div>
			);
		}
	}
	renderDelete() {
		if (this.props.isAdmin) {
			return (
				<div className="delete">
					<FontAwesomeIcon
						icon={faTimes}
						onClick={() => this.onDelete()}
						size={"1x"}
						style={{ color: "Red" }}
					/>
				</div>
			);
		}
	}

	render() {
		var url = "";
		if (this.props.song.album.images[0] === undefined) {
			url = "http://media.tumblr.com/tumblr_mf3r1eERKE1qgcb9y.jpg";
		} else {
			url = this.props.song.album.images[0].url;
		}
		return (
			<div className="template">
				<img src={url} alt="album cover" />
				<Col>
					<Row className="songName">{this.props.song.name}</Row>
					<Row className="artistName">
						{this.props.song.artists[0].name}
					</Row>
				</Col>

				<Col>{this.renderVoter()}</Col>
				{this.renderDelete()}
			</div>
		);
	}
}
