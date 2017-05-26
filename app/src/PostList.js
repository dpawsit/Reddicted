import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      data: [],
      linkTime: 20,
      denied: 0,
      called: false,
      saved: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSavedSubmit = this.handleSavedSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
  }

  componentDidMount() {
    var context = this;
    axios.get('/userPreferences')
      .then((response)=> {
        console.log('userPreferences gave us', response.data.linkLength)
        context.setState({
          linkTime: response.data.linkLength
        })
      })
      .catch((err) => {
        console.log('error in getting user preferences', err)
      })
  }

  handleSubmit (event) {
    var context = this;
    var number = this.state.number
    console.log('you requested these posts:', number)
    axios.get('/redditPosts/'+number)
    .then(function(response) {
      console.log('handleSubmit success', response)
      context.setState({
        data: response.data[0],
        denied: response.data[1],
        called: true
      })
    }) 
    .catch(function(error){
      console.log('error in handleSubmit', error)
    })
    event.preventDefault();
  }

  handleSavedSubmit (event) {
    this.state.saved = true;
    var context = this;
    var number = this.state.number
    console.log('you requested these posts:', number)
    axios.get('/savePost')
    .then(function(response) {
      console.log('handleSAvedSubmit success', response)
      context.setState({
        data: response.data
      })
    }) 
    .catch(function(error){
      console.log('error in handleSubmit', error)
    })
  }

  handleChange (event) {
    this.setState({
      number: event.target.value
    })
  }

  toggleSaved () {
    var prev = this.state.saved
    this.setState({
      saved: !prev
    })
    this.setState({data: []})
  }

  handleClick(event, index) {
    var oldData = this.state.data
    oldData.splice(index, 1)
    this.setState({data:oldData})
  }


  handleSaveClick(event, index) {
    var oldData = this.state.data
    var toDelete = oldData.splice(index, 1)
    this.setState({data:oldData})
    console.log('attempting to delete', toDelete)
    axios.post('/deletePost', {
      post: index
    })
    .then(response => {
      console.log('post sent to be deleted', response)
    })
    .catch(err => {
      console.log('something bad happened in deletion of post', err)
    })
  }

  handleSave(index) {
    var oldData = this.state.data
    var saved = oldData.splice(index, 1)
    this.setState({data:oldData})
    saved = saved.shift();
    axios.post('/savePost', {
      post: saved
    })
    .then(response => {
      console.log('post saved', response)
    })
    .catch(err => {
      console.log('error in saving post', err)
    })
  }

  render() {
    let filteredNum = null;
    if(this.state.called) {
      filteredNum = <p>{this.state.denied} elements removed for NSFW material</p>
    } 
    console.log('current state data is', this.state.data)
    console.log('linktime is', this.state.linkTime);
    if(this.state.saved) {
      return (
        <div>
        <p>this is saved mode</p>
        <p>Current Lifespan of Links: {this.state.linkTime} seconds</p>
        <button onClick = {() => this.toggleSaved()}> See live posts</button>
          <form onSubmit={this.handleSavedSubmit}>
            <label>
              Number of posts you want to see:
              <input type="text" value={this.state.number} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            {this.state.data.map((entry, i) => (
              <Post
              handleClick={this.handleSaveClick}
              handleSave={this.handleSave}
              data={entry}
              index={i}
              key={i}
              linkTime = {this.state.linkTime}
              />
              ))}
          </ul>
        </div>  
      );
    } else {
      return (
        <div>
        <p>Current Lifespan of Links: {this.state.linkTime} seconds</p>
        <button onClick = {() => this.handleSavedSubmit()}> See saved posts</button>
          <form onSubmit={this.handleSubmit}>
            <label>
              Number of posts you want to see:
              <input type="text" value={this.state.number} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            {filteredNum}
            {this.state.data.map((entry, i) => (
              <Post
              handleClick={this.handleClick}
              handleSave={this.handleSave}
              data={entry}
              index={i}
              key={i}
              linkTime = {this.state.linkTime}
              />
              ))}
          </ul>
        </div>  
      );
    }
  }
}

export default PostList;