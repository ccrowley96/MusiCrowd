import React, { Component } from "react";
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
      axios.get(`/api/queue/${1}`)
      .then((data) => {
        this.setState({queue: data});
      })
      .catch((err) => console.log(err))
      }

    render() {

    }
}