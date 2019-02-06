import React, { Component } from "react";
import { connect } from "react-redux";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import SongTemplate from "../SongTemplate/SongTemplate";
import axios from "axios";
import "./Queue.css";

class Queue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			queue: null,
			startTimer: false
		};
	}

	componentDidMount() {
		axios
			.get(`/api/queue/${this.props.partyCode}`)
			.then(res => {
				this.setState({ queue: res.data }, () => {
					this.apiRefresh();
				});
			})
			.catch(err => console.log(err));
	}

	componentDidUpdate = () => {
		this.apiRefresh();
	};

	apiRefresh = () => {
		setTimeout(() => {
			axios.get(`/api/queue/${this.props.partyCode}`).then(res => {
				this.setState(
					{
						queue: res.data
					},
					() => this.props.setQueue(this.state.queue)
				);
			});
		}, 1000);
	};

	render() {
		if (!this.state.queue)
			return (
				<div>
					<p>Loading Queue...</p>
				</div>
			);
		return (
			<div className="queue">
				<h1>Queue</h1>
				<div className="queue-wrapper">
					{this.state.queue.map(song => (
						<SongTemplate
							key={song.song_payload.id}
							song={song.song_payload}
							votes={song.votes}
							voterFlag={true}
							partyCode={this.props.partyCode}
							isAdmin={this.props.options}
						/>
					))}
				</div>
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
)(Queue);
