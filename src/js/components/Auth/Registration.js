import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../containers/Input';
import { registration } from '../../actions/actions';

class Registration extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, reset } = this.props;
    const submit = (values) => this.props.registration(values);
    if (this.props.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="tac">Please Register</h2>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(submit)}>
          <Field
            name="email"
            type="email"
            label="Email"
            component={Input}
          />
          <Field
            name="name"
            type="text"
            label="Name"
            component={Input}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            component={Input}
          />
          <Field
            name="passwordConfirm"
            type="password"
            label="Confirm password"
            component={Input}
          />
          <button type="submit" className="btn btn-primary">Register</button>
          <button type="button" className="btn btn-primary" onClick={reset}>Clear</button>
        </form>
      </div>
    );
  }
}


function validate(props) {
  const errors = {};
  if (!props.email) {
    errors.email = 'Please enter an email';
  }
  if (!props.name) {
    errors.name = 'Please enter your name';
  }
  if (!props.password) {
    errors.password = 'Please enter a password';
  }
  if (!props.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (props.password !== props.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { registration })(reduxForm({
  form: 'Registration', validate,
})(Registration));
