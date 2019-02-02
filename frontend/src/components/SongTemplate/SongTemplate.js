import React, { Component } from "react";
import { Media } from "reactstrap";
import "./SongTemplate.css";

export default class SongTemplate extends Component {
	render() {
		return (
			<div className="template">
				<img
					src={this.props.song.album.images[0].url}
					alt="album cover"
				/>
				<p>{this.props.song.name}</p>
			</div>
		);
	}
}
