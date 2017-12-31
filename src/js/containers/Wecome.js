import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = props => {
  return (
    <div className="tac">
      <h5>
        <Link to="/login" className="welcome-link">Log in</Link>
        or
        <Link to="/register" className="welcome-link">register</Link>
        to see the Book Storage
      </h5>
    </div>
  );
}
export default Welcome;
