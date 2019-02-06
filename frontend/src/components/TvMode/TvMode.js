import React, { Component } from "react";
import { Container } from "reactstrap";
import "./TvMode.css";
import QRCode from "qrcode";

export default class TvMode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect_link: "",
			code: undefined,
			url: undefined
		};
	}
	componentDidMount = () => {
		var code = this.props.history.location.search.split("=")[1];
		this.setState(
			{
				code: code,
				redirect_link: `http://${
					window.location.hostname
				}/room?=${code}`
			},
			() => {
				QRCode.toDataURL(this.state.redirect_link)
					.then(url => {
						this.setState({
							url
						});
					})
					.catch(err => {
						console.error(err);
					});
			}
		);
	};

	render() {
		return (
			<Container className="tvmode">
				<h1>TV Mode</h1>
				<h3>Room Code: {this.state.code}</h3>
				<div id="bars">
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
				</div>
				{this.state.url && <img src={this.state.url} alt="qrcode" />}
			</Container>
		);
	}
}
