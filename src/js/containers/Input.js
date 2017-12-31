import React from 'react';

const Input = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label>{label}</label>
      <input type={type}
             className="form-control"
             placeholder={label}
             {...input}
      />
      <div className="error">
        {touched && error && <span className="form-text text-muted">{error}</span>}
      </div>
    </div>
);

export default Input;
