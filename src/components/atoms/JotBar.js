import React, { Component } from 'react';
import './JotBar.scss';

export default class JotBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  keyPressed = (event) => {
    // console.log(event.shiftKey);
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state.input);
      this.setState({ input: '' });
    }
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="search-bar">
					<i className="material-icons">search</i>
					<input placeholder="What's on your mind?" onChange={this.handleChange} onKeyPress={this.keyPressed} value={this.state.input} type="textarea" />
			</div>
    )
  }
}