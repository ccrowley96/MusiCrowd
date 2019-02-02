import React, { Component } from "react";
import { Media } from "reactstrap";
import "./SongTemplate.css";

export default class SongTemplate extends Component {
	render() {
		return (
			<div>
				<Media>
					<Media left>
						<Media
							object
							data-src={this.props.song.album.images[2].url}
							alt="album cover image"
						/>
					</Media>
					<Media body>
						<Media heading>{this.props.song.name}</Media>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel
						metus scelerisque ante sollicitudin commodo. Cras purus
						odio, vestibulum in vulputate at, tempus viverra turpis.
						Fusce condimentum nunc ac nisi vulputate fringilla.
						Donec lacinia congue felis in faucibus.
					</Media>
				</Media>
			</div>
		);
	}
}
