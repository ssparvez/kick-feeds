import React, { Component, Fragment } from 'react';
import './NoteList.scss';
import { copyToClipboard, isValidURL } from '../../utils';
import Loader from '../atoms/Loader';
import _ from 'lodash';
import history from '../../history';

import noNotesImage from '../../assets/undraw_no_data_qbuo.svg'; // Tell Webpack this JS file uses this image
import EmptyState from '../atoms/EmptyState';

import ReactTooltip from 'react-tooltip';
import { withToast } from 'react-awesome-toasts';
import Modal from '../molecules/Modal';

import { connect } from 'react-redux';
import { createNote, fetchNotes, deleteNote, fetchTags, editNote } from '../../actions';
import JotBar from '../atoms/JotBar';

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.messagesEndRef = React.createRef();

    this.state = {
      showTagPicker: false,
      selectedNote: null,
      noteWasSubmitted: false
    }
  }

  componentDidMount() {
    // console.log(this.props.params.match);
    if (this.props.filteredTagId) {
      console.log(this.props.filteredTagId);
      this.props.fetchNotes({ tagId: this.props.filteredTagId });
    } else {
      console.log('we here?');
      this.props.fetchNotes();
    }

    this.props.fetchTags(); // maybe move this to wall and pass tags as prop?

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    // this.setState({ noteWasSubmitted: false });
  }

  onSubmit = (noteContent) => { // jotbar isnt in this component
    let note = { content: noteContent }
    if (this.props.filteredTagId) {
      console.log(note);
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
          { this.state.showTagPicker && this.renderTagSelector() }
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
    return this.props.notes.map(({ content, _id, createdOn, tagId }) => {
      // set tag options
      let tag;
      if (tagId && _.size(this.props.tags) > 0 && this.props.tags[tagId]) {
        tag = {
          name: this.props.tags[tagId].name,
          color: this.props.tags[tagId].color
        }
      }

      const timeOptions = { hour: 'numeric', minute: 'numeric' };

      let currentDate = new Date(createdOn);
      let time = currentDate.toLocaleTimeString("en-US", timeOptions); // Saturday, September 17, 2016

      currentDate.setHours(0, 0, 0, 0);

      let dateHeader;
      if (currentDate.getTime() !== previousDate.getTime()) {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateHeader = currentDate.toLocaleDateString("en-US", dateOptions);
      }

      previousDate = currentDate;

      return (
        <Fragment key={_id}>
          { dateHeader && <div className="date">{dateHeader}</div>}
          <div className="item" >
            <div className="details">
              <div className="time">{time}</div>
              { isValidURL(content) ? 
                <div className="message link" onClick={() => window.open(content.includes('http') ? content : 'http://' + content, '_blank') } data-tip="Go to site">{content}</div> : 
                <div className="message" data-tip="Copy to clipboard" onClick={() => copyToClipboard(content, this.props.toast)}>{content}</div>
              }
              { tag && <div className="tag" style={{color: tag.color}} onClick={() => history.push(`/tags/${tagId}`)}>#{tag.name}</div> }
            </div>
            
            <div className="actions">
              { !tag ?
                <i className="material-icons add-tag" data-tip="Add Tag" onClick={() => this.setState({showTagPicker: true, selectedNote: _id})}>label</i> :
                <i className="material-icons remove-tag" data-tip="Remove Tag" onClick={() => this.removeTagFromNote(_id)}>label_off</i>
              }
              <i className="material-icons edit" data-tip="Edit">edit</i>
              <i className="material-icons delete" data-tip="Remove" onClick={() => this.props.deleteNote(_id)}>delete</i>
            </div>
            <ReactTooltip />
          </div>
        </Fragment>
      );
    })
  }

  renderTagList() {
    return _.map(this.props.tags, ({ color, name, _id }) => {
      return <div key={_id} className="tag" style={{backgroundColor: color}} onClick={() => this.assignTagToNote(_id)}>{name}</div>;
    });
  }

  assignTagToNote(tagId) {
    this.setState({ showTagPicker: false, selectedNote: null })
    this.props.editNote(this.state.selectedNote, { tagId })
  }

  removeTagFromNote = (noteId) => {
    this.props.editNote(noteId, { tagId: null });
  }

  scrollToBottom = () => {
    if (this.props.notes.length > 0) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  renderTagSelector() {
    return (
      <Modal id="tag-selector" onDismiss={() => this.setState({showTagPicker: false})}>
        <div className="header">Select a tag</div>
        <div className="content">{this.renderTagList()}</div>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state);
  return {
    notes: Object.values(state.jotter.notes),
    tags: state.jotter.tags,
    isFetching: state.jotter.isFetching,
  }; // convert object back to an arra
}


export default connect(mapStateToProps, { createNote, fetchNotes, deleteNote, fetchTags, editNote })(withToast(NoteList));