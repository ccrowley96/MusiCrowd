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
		console.log('here', song)
		axios.post(`/api/add`)
		.then(() => {
			this.setState({results: []});
		})
		.catch((err) => console.log(err))

		// console.log(song);
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
