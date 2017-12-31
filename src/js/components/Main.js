import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks } from '../actions/actions';

import SearchField from '../containers/SearchField';
import Results from '../containers/Result';

class Main extends Component {
  render() {
    return (
      <div className="main-content home">
        <SearchField getBooks={this.props.getBooks} />
        <Results data={this.props.books} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({ getBooks }, dispatch);
}


export default connect(mapStateToProps, mapActionsToProps)(Main);

