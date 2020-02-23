import React, { Component, Fragment } from 'react';
import './NoteList.scss';
import Loader from '../atoms/Loader';

import noNotesImage from '../../assets/undraw_no_data_qbuo.svg'; // Tell Webpack this JS file uses this image
import EmptyState from '../atoms/EmptyState';

import { withToast } from 'react-awesome-toasts';

import { connect } from 'react-redux';
import { createNote, fetchNotes, fetchTags } from '../../actions';
import JotBar from '../atoms/JotBar';
import NoteListItem from './NoteListItem';

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.filteredTagId) {
      this.props.fetchNotes({ tagId: this.props.filteredTagId });
    } else {
      this.props.fetchNotes();
    }

    this.props.fetchTags(); // maybe move this to wall and pass tags as prop?

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onSubmit = (noteContent) => { // jotbar isnt in this component
    let note = { content: noteContent }
    if (this.props.filteredTagId) {
      note.tagId = this.props.filteredTagId;
    }

    this.props.createNote(note);
  }

  render() {
    if (this.props.notes.length > 0) {
      return (
        <div className="note-list">
          {this.renderNoteList()}
          <div style={{ float:"left", clear: "both" }} ref={this.messagesEndRef} />
          <JotBar onSubmit={this.onSubmit} />
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
    let previousDate = new Date('1970-01-01');
    return this.props.notes.map(note => {
      let currentDate = new Date(note.createdOn);
      currentDate.setHours(0, 0, 0, 0);

      let dateHeader;
      if (currentDate.getTime() !== previousDate.getTime()) {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateHeader = currentDate.toLocaleDateString("en-US", dateOptions);
      }

      previousDate = currentDate;

      return (
        <Fragment key={note._id}>
          { dateHeader && <div className="date">{dateHeader}</div>}
          <NoteListItem previousDate={previousDate} note={note} tags={this.props.tags} />
        </Fragment>
      )
    })
  }

  scrollToBottom = () => {
    if (this.props.notes.length > 0) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
}


const mapStateToProps = (state) => {
  return {
    notes: Object.values(state.jotter.notes),
    tags: state.jotter.tags,
    isFetching: state.jotter.isFetching,
  }; // convert object back to an arra
}


export default connect(mapStateToProps, { createNote, fetchNotes, fetchTags })(withToast(NoteList));