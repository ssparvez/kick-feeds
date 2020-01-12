import React, { Component } from 'react'
import './Wall.scss';
import JotBar from '../atoms/JotBar';
import { copyToClipboard } from '../../utils';
import Loader from '../atoms/Loader';
import { connect } from 'react-redux';
import { createNote, fetchNotes, deleteNote } from '../../actions';

import ReactTooltip from 'react-tooltip';
import { withToast } from 'react-awesome-toasts';

import noNotesImage from '../../assets/undraw_no_data_qbuo.svg'; // Tell Webpack this JS file uses this image
import EmptyState from '../atoms/EmptyState';
import Dashboard from '../molecules/Dashboard';

class Wall extends Component {

  constructor(props) {
    super(props);

    this.listRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  onSubmit = (note) => {
    console.log(note);
    this.props.createNote(note);

    const list = this.listRef.current;
    console.log(list);

    const isScrolledToBottom = list.scrollHeight - list.clientHeight <= list.scrollTop + 1;

    // scroll to bottom if isScrolledToBotto
    if (isScrolledToBottom) list.scrollTop = list.scrollHeight - list.clientHeight;
    else list.scroll({
      top: list.scrollHeight,
      behavior: 'smooth'
    });
  }

  render() {
    console.log(this.props.notes);
    return (
      <Dashboard>
        <div id="content" className="wall">
          {this.renderContent()}
          <JotBar onSubmit={this.onSubmit} />
        </div>
      </Dashboard>
    )
  }

  renderContent() {
    if (this.props.notes.length > 0) {
      return (
        <div className="note-list" ref={this.listRef}>
          {this.renderNoteList()}
        </div>
      )
    } else {
      if (this.props.isFetching) {
        return <Loader />;
      } else {
        // other svgs to use: towing, taken, warning
        const label = 'This is the beginning of your history.';
        return (
          <EmptyState image={noNotesImage} label={label} />
        )
      }

    }
  }
  renderNoteList() {
    return this.props.notes.map((note, index) => {
      let options = { hour: 'numeric', minute: 'numeric' };

      let time = new Date(note.createdOn);
      time = time.toLocaleTimeString("en-US", options); // Saturday, September 17, 2016

      return (
        <div className="item" key={index}>
          <div className="time">{time}</div>
          <div className="message" data-tip="Copy to clipboard" onClick={() => copyToClipboard(note.content, this.props.toast)}>{note.content}</div>
          <i className="material-icons edit">edit</i>
          <i className="material-icons delete" onClick={() => this.props.deleteNote(note._id)}>delete</i>
          <ReactTooltip />
        </div>
      );
    })
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notes: state.jotter.notes,
    isFetching: state.jotter.isFetching,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}
// export default withToast(ToastButton);

export default connect(mapStateToProps, { createNote, fetchNotes, deleteNote })(withToast(Wall));