import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { updateBook } from '../actions/actions';

import Input from '../containers/EditInput';
import Textarea from '../containers/EditTextarea';

class EditForm extends Component {
  render() {
    const { handleSubmit, activeBook } = this.props;
    const submit = (values) => this.props.updateBook({ values, activeBook });
    return (
      <div className="container">
        <form onSubmit={handleSubmit(submit)} >
            <Field
              name="name"
              type="text"
              label="Name"
              component={Input}
            />
            <Field
              name="author"
              type="text"
              label="Author"
              component={Input}
            />
            <Field
              name="ganre"
              type="text"
              label="Ganre"
              component={Input}
            />
            <Field
              name="description"
              type="textarea"
              label="Description"
              component={Textarea}
            />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeBook: state.auth.activeBook,
  };
}

export default connect(mapStateToProps, { updateBook })(reduxForm({
  form: 'EditForm',
})(EditForm));
