import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../containers/Input';
import { logIn } from '../../actions/actions';

class LogIn extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong><i className="fa fa-meh-o" aria-hidden="true">!</i></strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, reset } = this.props;
    const submit = (values) => {this.props.logIn(values); };
    if (this.props.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="tac">Please Log In</h2>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(submit)}>
            <Field
              name="email"
              type="email"
              label="Email"
              component={Input}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              component={Input}
            />
          <button type="submit" className="btn btn-primary">LogIn</button>
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
  if (!props.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  };
}


export default connect(mapStateToProps, { logIn })(reduxForm({
  form: 'LogIn', validate,
})(LogIn));
