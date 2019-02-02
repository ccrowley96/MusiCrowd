import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import "./Player.css";

const spotifyApi = new SpotifyWebApi();


class Player extends Component {
	constructor(props) {
		super(props);
    }

    componentDidMount = () => {
		if (this.props.access_token !== undefined)
			spotifyApi.setAccessToken(this.props.access_token);
	};

    render(){
        return (
            <div>
                <h1>"hellooo player"</h1>
            </div>
        );
    }
}



const actions = { };

const mapStateToProps = (state, ownProps) => {
	return {
		access_token: state.data.data.access_token,
		search_results: state.data.data.search_results
	};
};

export default connect(
	mapStateToProps,
	actions
)(Player);