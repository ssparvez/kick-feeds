import React, { Component, Fragment } from 'react';
import { copyToClipboard, isValidURL } from '../../utils';
import history from '../../history';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import { deleteNote, editNote } from '../../actions';
import { connect } from 'react-redux';
import { withToast } from 'react-awesome-toasts';
import './NoteListItem.scss';
import Modal from '../molecules/Modal';


class NoteListItem extends Component {
  constructor(props) {
    super(props);

    this.updateButtonRef = React.createRef();


    this.state = {
      isEditMode: false,
      content: this.props.note.content,
      showTagPicker: false,
    }
  }

  renderContent(content) {

    if (!this.state.isEditMode) {
      if (isValidURL(content)) {
        return <div className="message link" onClick={() => window.open(content.includes('http') ? content : 'http://' + content, '_blank') } data-tip="Go to site">{content}</div>;
      } else {
        return <div className="message" data-tip="Copy to clipboard" onClick={() => copyToClipboard(content, this.props.toast)}>{content}</div>;

      }
    } else {
      return (
        <Fragment>
          <div className="mask"></div>
          <input autoFocus value={this.state.content} onChange={this.handleChange} onKeyPress={this.keyPressed} onBlur={this.handleBlur} />
          <button className="filled blue" onClick={this.updateNote} ref={this.updateButtonRef}>Update</button>
        </Fragment>
      )
    }
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleBlur = (event) => {
    if (event.relatedTarget !== this.updateButtonRef.current) {
      this.setState({ isEditMode: false, content: this.props.note.content });
    }
  }

  keyPressed = (event) => {
    if (event.key === 'Enter') {
      this.updateNote();
    }
  }

  updateNote = () => {
    this.setState({ isEditMode: false });
    this.props.editNote(this.props.note._id, { content: this.state.content });
  }

  render() {
    const { content, _id, createdOn, tagId } = this.props.note;

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
    return (
      <div className="item" >
        <div className="details">
          <div className="time">{time}</div>
          {this.renderContent(content)}
          { tag && <div className="tag" style={{color: tag.color}} onClick={() => history.push(`/tags/${tagId}`)}>#{tag.name}</div> }
        </div>
        
        <div className="actions">
          { !tag ?
            <i className="material-icons add-tag" data-tip="Add Tag" onClick={() => this.setState({showTagPicker: true})}>label</i> :
            <i className="material-icons remove-tag" data-tip="Remove Tag" onClick={() => this.removeTagFromNote(_id)}>label_off</i>
          }
          <i className="material-icons edit" data-tip="Edit" onClick={() => this.setState({ isEditMode: true })}>edit</i>
          <i className="material-icons delete" data-tip="Remove" onClick={() => this.props.deleteNote(_id)}>delete</i>
        </div>
        { this.state.showTagPicker && this.renderTagSelector() }

        <ReactTooltip />
      </div>
    );
  }

  removeTagFromNote = (noteId) => {
    this.props.editNote(noteId, { tagId: null });
  }

  assignTagToNote(tagId) {
    this.setState({ showTagPicker: false })
    this.props.editNote(this.props.note._id, { tagId })
  }

  renderTagSelector() {
    return (
      <Modal id="tag-selector" onDismiss={() => this.setState({showTagPicker: false})}>
        <div className="header">Select a tag</div>
        <div className="content">{this.renderTagList()}</div>
      </Modal>
    )
  }

  renderTagList() {
    return _.map(this.props.tags, ({ color, name, _id }) => {
      return <div key={_id} className="tag" style={{backgroundColor: color}} onClick={() => this.assignTagToNote(_id)}>{name}</div>;
    });
  }
}

export default connect(null, { deleteNote, editNote })(withToast(NoteListItem));