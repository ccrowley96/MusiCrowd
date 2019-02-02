import React, { Component } from "react";
import Search from "../Search/Search";
import Results from "../Results/Results";

import { Container } from "reactstrap";
import "./Room.css";

export default class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomCode: "",
			results: []
		};
	}

	componentDidMount = () => {
		var code = this.props.history.location.search.split("=")[1];
		this.setState({
			roomCode: code
		});
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
		return (
			<div className="room">
				<Container className="page">
					<div>
						<Search setResults={this.setResults} />
						<Results
							results={this.state.results}
							clearSearch={this.clearSearch}
						/>
					</div>
				</Container>
			</div>
		);
	}
}
