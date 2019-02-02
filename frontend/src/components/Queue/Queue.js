import React, { Component } from "react";
import { connect } from "react-redux";
import { setAccessToken, setSearchResults } from "../../actions/dataAction";
import axios from 'axios';
import "./Queue.css";


class Queue extends Component {

    constructor(props) {
		super(props);
		this.state = {
            queue: null
		};
    }

    componentDidMount(){
      axios.get(`/api/queue/${this.props.partyCode}`)
      .then((res) => {
        this.setState({queue: res.data}, () => console.log('queue: ',this.state.queue));
      })
      .catch((err) => console.log(err))
      }

    render() {
      return(
      <div>
        <h1>Queue</h1>
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