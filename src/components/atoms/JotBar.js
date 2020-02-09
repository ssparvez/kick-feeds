import React, { Component } from 'react';
import './JotBar.scss';
import ReactTooltip from 'react-tooltip';

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
      this.submitNote();
    }
  }

  submitNote = () => {
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="search-bar">
					<i className="material-icons search">search</i>
					<input placeholder="What's on your mind?" onChange={this.handleChange} onKeyPress={this.keyPressed} value={this.state.input} type="textarea" />
          <i className="material-icons send" data-tip="Add Note" onClick={this.submitNote}>add_box</i>
          <ReactTooltip />
			</div>
    )
  }
}