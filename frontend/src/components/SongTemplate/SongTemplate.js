import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretUp,
	faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { Media } from "reactstrap";

import "./SongTemplate.css";

export default class SongTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			votes: 0
		}
	  }

	  onVote(vote_button){
		let vote_to_send = 0;
		let local_vote_to_update = 0;

		if(vote_button == 1) { //upvote pressed
			if(this.state.vote == 0){ // Upvote should highlight
				vote_to_send = 1;
				local_vote_to_update = 1;
			} else if(this.state.vote == -1){ // upvote should highlight
				vote_to_send = 2;
				local_vote_to_update = 1;
			} else if(this.state.vote == 1){ // Unhighlight upvote
				vote_to_send = -1;
				local_vote_to_update = 0;
			}	
		} else if(vote_button == -1){
			if(this.state.vote == 0){ // downvote should highlight
				vote_to_send = -1;
				local_vote_to_update = -1;
			} else if(this.state.vote == 1){ //downvote should highlight
				vote_to_send = -2;
				local_vote_to_update = -1;
			} else if(this.state.vote == -1){ // Downvote should unhighlight
				vote_to_send = 1;
				local_vote_to_update = 0;
			} 	
		}

		let payload = {
			vote: vote_to_send,
			party_code: this.props.partyCode,
			song_id: this.props.song.id // This should either pass entire song object or just the ID
		}

		console.log('vote to send: ', vote_to_send);
		
		axios.post(`/api/vote`, payload)
		.then((res) => {
		  if(res.status == 200){
			this.setState({vote:local_vote_to_update});
		  }
		})
		.catch((err) => console.log(err))
	  }

	renderVoter(){
		console.log(this.props.song);
		if(this.props.voterFlag){
			return (
				<div className = "voter">
						<span>
							<p>{this.props.votes}</p>
							<FontAwesomeIcon
								icon={faCaretUp}
								onClick={() => this.onVote(1)}
								size={"4x"}
							/>
							<FontAwesomeIcon
								icon={faCaretDown}
								onClick={() => this.onVote(-1)}
								size={"4x"}
							/>
						</span>
				</div>
			)
		}
	}

	render() {
		return (
			<div className="template">
				<img
					src={this.props.song.album.images[0].url}
					alt="album cover"
				/>
				<p>{this.props.song.name}</p>
				{this.renderVoter()}
			</div>
		);
	}
}
