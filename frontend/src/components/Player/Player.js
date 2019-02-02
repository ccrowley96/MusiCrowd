import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import "./Player.css";

const spotifyApi = new SpotifyWebApi();

//spotify:track:3sTN90bIP2cJ1783ctHykO
class Player extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            token: "BQD6fkWO0xU0iGvXr8_U4b6ylKDX-yOi9ajCiXFkLbvHGlxAbnY9_gpomLMIMd7L9jiuFDSDXFjq6dZ3UTsT1AWqTzJFmHu6Sa9Y9Ko6BxQuWhp6bxvRdimMS8I8qdyZEhgSv2Pen01IwYYx4f6DmoFFvU5606KMrXbY4Wm7",
            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            playing: false,
            position: 0,
            duration: 0,
        };

        this.playerCheckInterval = null;
    }

    componentDidMount = () => {
		if (this.props.access_token !== undefined)
			spotifyApi.setAccessToken(this.props.access_token);
    };
    
    checkForPlayer() {
        const token = this.props.access_token;
      
        if (window.Spotify !== null) {
            clearInterval(this.playerCheckInterval);
            
            this.player = new window.Spotify.Player({
                name: "Decibois Spotify Player",
                getOAuthToken: cb => { cb(token); },
            });

            this.createEventHandlers();

            this.player.connect();
        }
    }

    handleLogin() {
        if (this.props.access_token !== "") {
          // check every second for the player.
          this.setState({ loggedIn: true });
          this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
          console.error(e);
          this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });
      
        // Playback status updates
        this.player.on('player_state_changed', state => { console.log(state); });
      
        // Ready
        this.player.on('ready', data => {
          let { device_id } = data;
          console.log("Let the music play on!");
          this.setState({ deviceId: device_id });
        });
      }

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