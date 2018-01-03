import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link to="/logout" className="nav-link">Log out</Link>
        </li>
      );
    }
    return (
      <p>
        <li className="nav-item" key={145457}>
          <Link to="/login" className="nav-link">Log in</Link>
        </li>
        or
        <li className="nav-item" key={33123}>
          <Link to="/register" className="nav-link">Sign up</Link>
        </li>
      </p>
    );
  }
  renderUserContent() {
    if (this.props.user) {
      return (
        <div id="user">
          <span className="navbar-brand">Hello, {this.props.user.name}!</span>
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                   href="#"
                   id="navbarDropdown"
                   role="button"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false"
                >
                  <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/bestbooks" className="dropdown-item">My best books</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark ">
          {this.renderUserContent()}
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item " key={28345}>
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            {this.renderLinks()}
          </ul>
        </nav>
      </header>
    );
  }
}
