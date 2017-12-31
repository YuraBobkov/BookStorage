import React from 'react';

const EditTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea
           className="form-control"
           placeholder={label}
           {...input}

    />
  </div>
);

export default EditTextarea;
