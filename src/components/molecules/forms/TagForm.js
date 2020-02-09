// inputs for name, description, color picker
import React, { Fragment, Component } from 'react';
import Modal from '../Modal';
import history from '../../../history';
import './TagForm.scss';
import { Formik, Form, Field } from 'formik';
import { withToast } from 'react-awesome-toasts';
import { CirclePicker } from 'react-color'

class TagForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
    };
  }
  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id);
  }

  handleChangeComplete = ({ hex }) => {
    this.setState({ color: hex });
  };

  renderActions(isSubmitting) {
    return (
      <Fragment>
        <div className="cancel" onClick={() => history.push('/tags')}>Cancel</div>
        <button type="submit" disabled={isSubmitting} className="filled blue send">Submit</button>
      </Fragment>
    );
  }

  onSubmit = (formValues, { setSubmitting }) => {
    setTimeout(() => {
      this.props.onSubmit({ ...formValues, color: this.state.color });
      setSubmitting(false);
    }, 400);
  }

  toastErrors(errors) {
    const toastProps = {
      actionText: 'Ok',
      ariaLabel: 'An error occurred while logging in, click to acknowledge',
      onActionClick: this.props.toast.hide,
    };
    let text;
    if (Object.keys(errors).length > 1) {
      text = "An email and password is required"
    } else {
      text = Object.values(errors)[0];
    }

    toastProps.text = text;

    this.props.toast.show(toastProps);
  }

  renderContent() {
    return (
      <Fragment>
        <div className="message">
          Enter the tag info below
        </div>

        <Field name="name" placeholder="Enter a name" />
        <Field name="description" placeholder="Enter a description" />
        <CirclePicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />
      </Fragment>
    );
  }

  render() {
    console.log(this.props.initialValues);
    return (
      <Modal id="tag-form" onDismiss={() => history.push('/tags')}>
        <Formik initialValues={this.props.initialValues} onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} validateOnBlur={false}>
          {({ isSubmitting }) => (
            <Form>
              <div className="header">{this.props.title}</div>
              <div className="content">
              {this.renderContent()}
              </div>
              <div className="actions">
                {this.renderActions(isSubmitting)}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }

  validate = formValues => {
    console.log('VALIDATING');
    console.log(formValues);
    const errors = {};

    if (!formValues.name) {
      // only runs if user did not enter name
      errors.name = 'A name is required'; // prop must match name prop on field tag
    }

    if (Object.keys(errors).length > 0) {
      this.toastErrors(errors);
    }

    return errors;
  };

}

export default withToast(TagForm);