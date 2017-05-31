import React from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import Dash from './Dashboard'
import SignIn from './SignIn'

let context = this;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    context.props.username ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends React.Component {
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

  render () {
    return (
      <Router>
        <div>
          welcome to reddicted
          yadda yadda
          <Link to="/login">Sign in or sign up!</Link>
          <Link to="/dash">Get groovy</Link>
          <Route path = '/login' component={SignIn}/>
          <Route path = '/dash' render= {()=>{
            console.log('this.', this.props.username)
            return this.props.username ? (
              <Dash />
            ) : (
            <Redirect to={{
              pathname: '/login'
            }}/>)
          }} />
        </div>
      </Router>
    )
	}
}

function mapStateToProps({ appState }) {
	return { username: appState.username };
}

export default connect (mapStateToProps, {})(App)