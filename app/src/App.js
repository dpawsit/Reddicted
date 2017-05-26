import React from 'react';
import PostList from './PostList'
import axios from 'axios';
import SignIn from './SignIn'
import Bar from './Navbar'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			mounted: false
		}
		this.signIn = this.signIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var context = this;
		axios.get('/checkSession')
		.then((response)=> {
			console.log('resposne of componentDidMount', response.data.user);
			context.setState({
				user: response.data.user,
				mounted: true
			})
		})
		.catch((error) => {
			console.log('error in componentDidMount', error);
		})
	}

	signIn (user) {
		this.setState({
			user: user
		})
	}

	handleLogOut () {
		var context = this;
		console.log('attempting to log out')
		axios.get('/destroySession') 
		.then((response)=> {
			console.log('user destroyed', response);
			context.setState({
				user: null
			})
		})
		.catch((error) => {
			console.log('error in logout', error);
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

  render () {
  	console.log('current user is', this.state.user);
  	if(this.state.mounted === true) {
	  	if(this.state.user) {
		    return(
		    	<div>
						<Bar handleLogOut =  {this.handleLogOut} />
			      <p> Welcome back {this.state.user}!</p>
			    	<form onSubmit={this.handleSubmit}>
			        <label>
			          How many seconds do you want to see links for?
			          <input id='number' type="text"/>
			        </label>
			        <input type="submit" value="Submit" />
			      </form>
			    	<PostList user = {this.state.user}/>
		    	</div>
		    )
		  } else{
		  	return(
		  		<div>
		  			<h1>Sign up</h1>
		  				<SignIn signIn = {this.signIn}/>
		  		</div>
		  		)
		  }
	  } 
	  else {
	  	return(
	  		<div></div>
	  		)
	  }
	}
}

export default App