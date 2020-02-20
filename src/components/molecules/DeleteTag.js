import React, { Fragment, Component } from 'react';
import Modal from './Modal';
import history from '../../history';
import { fetchTag, deleteTag } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DeleteTag extends Component {
  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    return (
      <div className="actions">
        <Link to="/tags" className="ui button">Cancel</Link>
        <button onClick={this.onSubmit} className="filled red">Delete</button>
      </div>
    );
  }

  onSubmit = () => {
    this.props.deleteTag(this.props.match.params.id);
  };

  renderContent() {
    const question = 'Are you sure that you want to delete this tag?'
    if (!this.props.tag) {
      return question;
    }

    return `${question} #${this.props.tag.name} will be detached from any note.`;
  }

  render() {
    return (
      <Modal onDismiss={() => history.push('/tags')}>
        {this.renderContent()}
        {this.renderActions()}
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { tag: state.jotter.tags[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchTag, deleteTag })(DeleteTag);