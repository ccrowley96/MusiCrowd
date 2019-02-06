import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { InputGroup, Input, Button, Alert } from "reactstrap";
import { setAccessToken } from "../../actions/dataAction";
import { connect } from "react-redux";
import mobile from "is-mobile";
import "./HomePage.css";
import musicrowd_logo from "../../img/musicrowd_logo_white.png";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			access_token: undefined,
			roomCode: undefined,
			errMessage: false,
			goToRoom: false
		};
	}
	componentDidMount = () => {
		const params = this.getHashParams();
		const token = params.access_token;
		if (token) {
			this.setState(
				{
					access_token: token
				},
				() => this.props.setAccessToken(token)
			);
		}
		console.log(this.props.history.location);
	};

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	handleChange = e => {
		this.setState({
			roomCode: e.target.value
		});
	};

	joinRoom = () => {
		if (this.state.goToRoom)
			return <Redirect to={`/room?=${this.state.roomCode}`} />;
	};

	hitRoom = () => {
		if (this.state.roomCode !== undefined) {
			this.setState({
				goToRoom: true
			});
		} else {
			this.setState({
				errMessage: true
			});
		}
	};

	setErrMessage = () => {
		this.setState({
			errMessage: true
		});
	};

	render() {
		if (this.state.access_token) {
			return <Redirect to="/admin" />;
		}

		return (
			<div className="homepage">
				<div>
					<img
						className="logo"
						src={musicrowd_logo}
						alt="musicrowd"
					/>
					<div class="slogan">
						<h2>The crowdsourced DJ.</h2>
					</div>
					<InputGroup className="input">
						<Input
							placeholder="Room code"
							onChange={this.handleChange}
							defaultValue={this.state.roomCode}
						/>
						{this.joinRoom()}
						<Button onClick={this.hitRoom}>Join room</Button>
					</InputGroup>
					{this.state.errMessage && (
						<Alert color="danger">Room does not exist!</Alert>
					)}
					{/* We can't use template string with the href below */}
					{!mobile({ tablet: true }) && (
						<a href={`${process.env.REACT_APP_HOST_PROXY}/login`}>
							<Button color="secondary" className="cr">
								Create Room
							</Button>
						</a>
					)}
				</div>
			</div>
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
)(HomePage);
