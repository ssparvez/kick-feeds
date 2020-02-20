import React, { Component } from 'react';
import EmptyState from '../atoms/EmptyState';
import emptyImage from '../../assets/undraw_Working_oh83.svg'; // Tell Webpack this JS file uses this image
import Dashboard from '../molecules/Dashboard';
import { FAB } from '../atoms/FAB';
import { Link, Route } from 'react-router-dom';
import history from '../../history';
import './Tags.scss';
import { connect } from 'react-redux';
import { createTag, fetchTags } from '../../actions';
import { withToast } from 'react-awesome-toasts';
import Loader from '../atoms/Loader';
import CreateTag from '../molecules/CreateTag';
import EditTag from '../molecules/EditTag';
import ReactTooltip from 'react-tooltip';
import DeleteTag from '../molecules/DeleteTag';


class Tags extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  render() {
    return (
      <Dashboard>
        <div id="content" className="tags">
          {this.renderContent()}
          <Link to="/tags/create">
            <FAB />
          </Link>
          <Route path="/tags/create" exact component={CreateTag} />
          <Route path="/tags/edit/:id" exact component={EditTag} />
          <Route path="/tags/delete/:id" exact component={DeleteTag} />

        </div>
      </Dashboard>
    )
  }

  renderTagList() {
    return this.props.tags.map(({ name, description, color, _id }) => {
      // make sure only authorized tags can be viewed
      return (
        <div onClick={() => history.push(`/tags/${_id}`)} className="tag" key={_id} style={{backgroundColor: color}}>
          <div className="details">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
          </div>
          <div className="actions">
            <Link to={`/tags/edit/${_id}`} onClick={e => e.stopPropagation()}>
              <i className="material-icons edit" data-tip="Edit">edit</i>
            </Link>
            <Link to={`/tags/delete/${_id}`} onClick={e => e.stopPropagation()}>
              <i className="material-icons delete" data-tip="Remove">delete</i>
            </Link>
            <ReactTooltip />
          </div>
        </div>
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

  // onTagEdit = (e) => {
  //   history.push('/tags/edit/' + )
  // }

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