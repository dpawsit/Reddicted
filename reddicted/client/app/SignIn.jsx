import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSignUp = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleSignup (event) {
    var context = this;
    axios.post('/signup', {
      username: context.state.username,
      password: context.state.password
    })
    .then(function(response) {
      console.log('response in handleSingup', response)
      context.handleLogin()
    }) 
    .catch(function(error){
      console.log('error in handleSignUp', error)
    })
  }

  handleLogin (event) {
    var context = this;
    axios.post('/login', {
      username: context.state.username,
      password: context.state.password
    })
    .then(function(response) {
      console.log('response in handlelogin', response)
      context.props.signIn(response.data);
    }) 
    .catch(function(error){
      console.log('error in handlelogin', error)
    })
  }

  handleUserChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePassChange (event) {
    this.setState({
      password: event.target.value
    })
  }


  render() {
    return (
      <div>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleUserChange} />
          </label>
        </form>
        <form>
          <label>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePassChange} />
          </label>
        </form>
        <button 
          onClick = {() => {
          this.handleLogin();
          }}>
          Login
        </button>
        <button 
          onClick = {() => {
          this.handleSignUp();
          }}>
          Signup
        </button>
      </div>
    );
  }
}

export default SignIn;
