import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { AUTH_USER } from '../const/const';



import LogIn from './Auth/LogIn';
import LogOut from './Auth/LogOut';
import Registration from './Auth/Registration';
import Main from './Main';
import Welcome from '../containers/Wecome';
import Header from '../containers/Header';
import BestBooks from './UserBooks';

import { getUser } from '../actions/actions'

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getUser(token);
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            authenticated={this.props.authenticated}
            user={this.props.user}
          />
          <Route
            exact path="/"
            render={() => this.props.authenticated ? <Main /> : <Welcome />}
          />
          <Route path="/logout" component={LogOut} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Registration} />
          <Route path="/bestbooks" component={BestBooks} />
        </div>
      </BrowserRouter>

    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  };
}


export default connect(mapStateToProps, { getUser })(App);
