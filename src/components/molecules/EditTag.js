import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTag, editTag } from '../../actions';
import TagForm from './forms/TagForm';

class EditTag extends Component {
  componentDidMount() {
    // this.props.fetchTag(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.editTag(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.tag) {
      return <div>Loading</div>
    }

    const initialValues = _.pick(this.props.tag, 'name', 'description');
    const { color } = this.props.tag;

    return <TagForm onSubmit={this.onSubmit} initialValues={initialValues} color={color} title="Edit tag" />;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps.match.params.id);
  return { tag: state.jotter.tags[ownProps.match.params.id] };
  // w react router, cannot assume each component has fetched the same data
}

export default connect(mapStateToProps, { fetchTag, editTag })(EditTag);