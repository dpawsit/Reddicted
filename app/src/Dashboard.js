import React from 'react';
import PostList from './PostList'
import axios from 'axios';
import Bar from './Navbar'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Dash extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleSubmit() {
		var linkLength = document.getElementById("number").value;
		axios.post('/userPreferences', {
			linkTime: linkLength
		})
		.then(response => {
			console.log('linklength set, response is', response)
		})
		.catch(err => {
			console.log('error in setting linklength', err);
		})
	}

  handleSubmit() {
    var linkLength = document.getElementById("number").value;
    axios.post('/userPreferences', {
      linkTime: linkLength
    })
    .then(response => {
      console.log('linklength set, response is', response)
    })
    .catch(err => {
      console.log('error in setting linklength', err);
    })
  }


  render() {
    return (
      <div>
        <Bar />
        <form onSubmit={this.handleSubmit}>
          <label>
            How many seconds do you want to see links for?
            <input id='number' type="text"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <PostList/>
      </div>
    )
  }
}

export default Dash