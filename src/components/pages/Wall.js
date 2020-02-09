import React, { Component, Fragment } from 'react'
import './Wall.scss';
import JotBar from '../atoms/JotBar';
import { copyToClipboard } from '../../utils';
import Loader from '../atoms/Loader';
import { connect } from 'react-redux';
import { createNote, fetchNotes, deleteNote, fetchTags, editNote } from '../../actions';
import _ from 'lodash';

import ReactTooltip from 'react-tooltip';
import { withToast } from 'react-awesome-toasts';

import noNotesImage from '../../assets/undraw_no_data_qbuo.svg'; // Tell Webpack this JS file uses this image
import EmptyState from '../atoms/EmptyState';
import Dashboard from '../molecules/Dashboard';
import Modal from '../molecules/Modal';

class Wall extends Component {

  constructor(props) {
    super(props);

    this.messagesEndRef = React.createRef();

    this.state = {
      showTagPicker: false,
      selectedNote: null
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    this.props.fetchTags();
    // this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onSubmit = (note) => {
    console.log(note);
    this.props.createNote(note);
  }

  render() {
    console.log(this.props.notes);
    return (
      <Dashboard>
        <div id="content" className="wall">
          {this.renderContent()}
          <JotBar onSubmit={this.onSubmit} />
          { this.state.showTagPicker && this.renderTagSelector() }
        </div>
      </Dashboard>
    )
  }

  scrollToBottom = () => {
    console.log(this.messagesEndRef)
    if (this.props.notes.length > 0) {
      console.log('SCROLLING')
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

  renderContent() {
    if (this.props.notes.length > 0) {
      return (
        <div className="note-list">
          {this.renderNoteList()}
          <div style={{ float:"left", clear: "both" }} ref={this.messagesEndRef} />
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
      let showTag = false;
      let tagName, tagColor;
      if (tagId && _.size(this.props.tags) > 0) {
        showTag = true;
        tagName = this.props.tags[tagId].name;
        tagColor = this.props.tags[tagId].color;
      }

      const timeOptions = { hour: 'numeric', minute: 'numeric' };

      let currentDate = new Date(createdOn);
      let time = currentDate.toLocaleTimeString("en-US", timeOptions); // Saturday, September 17, 2016

      currentDate.setHours(0, 0, 0, 0);

      let addDateHeader = false;
      let dateHeader;
      if (currentDate.getTime() !== previousDate.getTime()) {
        addDateHeader = true;
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateHeader = currentDate.toLocaleDateString("en-US", dateOptions);
        console.log(dateHeader);
      }

      previousDate = currentDate;

      return (
        <Fragment>
          { addDateHeader && <div className="date">{dateHeader}</div>}
          <div className="item" key={_id}>
            <div className="time">{time}</div>
            <div className="message" data-tip="Copy to clipboard" onClick={() => copyToClipboard(content, this.props.toast)}>{content}</div>
            { showTag && <div className="tag" style={{color: tagColor}}>#{tagName}</div> }

            <i className="material-icons add-tag" data-tip="Assign Tag" onClick={() => this.setState({showTagPicker: true, selectedNote: _id})}>library_add</i>
            <i className="material-icons edit" data-tip="Edit">edit</i>
            <i className="material-icons delete" data-tip="Remove" onClick={() => this.props.deleteNote(_id)}>delete</i>
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
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notes: Object.values(state.jotter.notes),
    tags: state.jotter.tags,
    isFetching: state.jotter.isFetching,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}
// export default withToast(ToastButton);

export default connect(mapStateToProps, { createNote, fetchNotes, deleteNote, fetchTags, editNote })(withToast(Wall));