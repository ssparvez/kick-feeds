import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTag } from '../../actions';
import TagForm from './forms/TagForm';

class CreateTag extends Component {
  onSubmit = (values) => {
    this.props.createTag(values);
  }

  render() {
    const initialValues = { name: '', description: '' };

    // name prop is always required
    //props.handleSubmit comes from redux form
    return <TagForm onSubmit={this.onSubmit} initialValues={initialValues} title="Create a new tag" color="#f44336" />;
  }
}

export default connect(null, { createTag })(CreateTag);