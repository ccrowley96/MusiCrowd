import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { InputGroup, Input } from "reactstrap";
import "./HomePage.css";

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			access_token: undefined,
			roomCode: undefined
		};
	}
	componentDidMount = () => {
		var token = this.props.history.location.hash.split("=")[1];
		if (token) {
			this.setState({
				access_token: token
			});
		}
	};

	handleChange = e => {
		this.setState(
			{
				roomCode: e.target.value
			},
			() => console.log(this.state.roomCode)
		);
	};

	render() {
		if (this.state.access_token) return <Redirect to="/admin" />;

		return (
			<div className="homepage">
				<div>
					<InputGroup className="input">
						<Input
							placeholder="username"
							onChange={this.handleChange}
							defaultValue={this.state.roomCode}
						/>
						<Link to={`/room?${this.state.roomCode}`}>
							Join room
						</Link>
					</InputGroup>
					<a href="http://localhost:8888/login">Create Room</a>
				</div>
			</div>
		);
	}
}
