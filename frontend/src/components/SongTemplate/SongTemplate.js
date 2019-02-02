import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretUp,
	faCaretDown
} from "@fortawesome/free-solid-svg-icons";
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
				<div className = "voter">
							<FontAwesomeIcon
								icon={faCaretUp}
								onClick={() => this.onUpVote()}
							/>
							<FontAwesomeIcon
								icon={faCaretDown}
								onClick={() => this.onDownVote()}
							/>
				</div>
			</div>
		);
	}
}
