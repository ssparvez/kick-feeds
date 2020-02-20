import React, { Component } from 'react';
import Dashboard from '../molecules/Dashboard';
import { connect } from 'react-redux';
import { fetchNotes, fetchTag } from '../../actions';
import Skeleton from 'react-loading-skeleton';

import './TagDetail.scss';
import NoteList from '../molecules/NoteList';

class TagDetail extends Component {
  componentDidMount() {
    console.log(this.props.match.params.tagId);
    this.props.fetchTag(this.props.match.params.tagId);
    // this.scrollToBottom();
  }

  renderBanner() {
    if (this.props.tag) {
      return (
        <div className="tag-banner" style={{backgroundColor: this.props.tag.color}}>
          <div className="name">{this.props.tag.name}</div>
          <div className="description">{this.props.tag.description}</div>
        </div>
      );
    } else {
      return <Skeleton height={70}/>
    }
  }

  render() {
    console.log(this.props);
    return (
      <Dashboard>
      <div id="content" className="tag-detail">
        {this.renderBanner()}
        <NoteList filteredTagId={this.props.match.params.tagId} />
      </div>
    </Dashboard>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notes: Object.values(state.jotter.notes),
    tag: state.jotter.tag,
    isFetching: state.jotter.isFetching,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}
// export default withToast(ToastButton);

export default connect(mapStateToProps, { fetchNotes, fetchTag })(TagDetail);