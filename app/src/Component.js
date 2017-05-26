import React from 'react';

class BaseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    let newValue = this.state.value + 1;
    this.setState({value: newValue});
  }

  render() {
    return (
      <div>
        value : <span>{this.state.value}</span>
        <div><button onClick={this.handleSubmit}>click this button</button></div>
      </div>
    );
  }

}

export default BaseComponent;