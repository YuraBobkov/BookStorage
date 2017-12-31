import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logOut } from '../../actions/actions';

class LogOut extends Component {
  componentWillMount() {
    this.props.logOut();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}



export default connect(null, { logOut })(LogOut);
