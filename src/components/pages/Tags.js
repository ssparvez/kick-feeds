import React, { Component } from 'react';
import EmptyState from '../atoms/EmptyState';
import emptyImage from '../../assets/undraw_Working_oh83.svg'; // Tell Webpack this JS file uses this image
import Dashboard from '../molecules/Dashboard';
import { FAB } from '../atoms/FAB';
import { Link, Route } from 'react-router-dom';
import TagForm from '../molecules/forms/TagForm';
import './Tags.scss';
import { connect } from 'react-redux';
import { createTag, fetchTags } from '../../actions';
import { withToast } from 'react-awesome-toasts';
import Loader from '../atoms/Loader';


class Tags extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  onCreateTag = (values) => {
    console.log('hey!');
    console.log('values', values);
    this.props.createTag(values);
  }

  render() {
    return (
      <Dashboard>
        <div id="content" className="tags">
          {this.renderContent()}
          <Link to="/tags/create">
            <FAB />
          </Link>
          <Route path="/tags/create" render={() => <TagForm initialValues={{name: '', description: ''}} title="Create a new tag" mode="create" color="#f44336" onSubmit={this.onCreateTag} />} />
        </div>
      </Dashboard>
    )
  }

  renderTagList() {
    return this.props.tags.map(({ name, description, color, _id }) => {
      // make sure only authorized tags can be viewed
      return (
        <Link to={`/tags/${_id}`} className="tag" key={_id} style={{backgroundColor: color}}>
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </Link>
      )
    })
  }

  renderContent() {
    if (this.props.tags.length > 0) {
      return (
        <div className="list">
          {this.renderTagList()}
        </div>
      )
    } else {
      if (this.props.isFetching) {
        return <Loader />;
      } else {
        return <EmptyState image={emptyImage} label="Add a tag below" />;
      }
    }
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tags: Object.values(state.jotter.tags),
    isFetching: state.jotter.isFetching,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { createTag, fetchTags })(withToast(Tags));