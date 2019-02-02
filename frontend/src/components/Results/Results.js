import React, { Component } from "react";
import axios from 'axios';
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import { connect } from "react-redux";
import SongTemplate from "../SongTemplate/SongTemplate";
import "./Results.css";

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		};
	}

	componentDidUpdate = () => {
		console.log(this.props.results);
	};

	handleSongClick = (song) => {
		let payload = {song:song, room_id: 1};
		//TODO change room ID to stateful
		axios.post(`/api/add_song`, payload )
		.then(() => {
			this.props.clearSearch();
		})
		.catch((err) => console.log(err))
	}

	render() {
		return (
			<div className="results">
					{this.props.results.map((song, i) => (
						<div className ="song-item" key ={i} onClick={()=> this.handleSongClick(song)}>
							<SongTemplate key={i} song={song} />
						</div>
					))}
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
)(Results);
