import React from 'react';

const EditInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type}
           className="form-control"
           placeholder={label}
           {...input}
    />
  </div>
);

export default EditInput;
