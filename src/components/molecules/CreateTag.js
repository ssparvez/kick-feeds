import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTag } from '../../actions';
import TagForm from './forms/TagForm';

class CreateTag extends Component {
  onSubmit = (values) => {
    console.log('hey!');
    console.log('values', values);
    this.props.createTag(values);
  }

  render() {
    console.log(this.props); // bunch of props get added via redux form

    const initialValues = { name: '', description: '' };

    // name prop is always required
    //props.handleSubmit comes from redux form
    return <TagForm onSubmit={this.onSubmit} initialValues={initialValues} title="Create a new tag" color="#f44336" />;
  }
}

export default connect(null, { createTag })(CreateTag);