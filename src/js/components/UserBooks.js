import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMyBooks } from '../actions/actions';
import Item from './Item';


class BestBooks extends Component {
  componentDidMount() {
    this.props.getMyBooks(this.props.user.email);
  }
  render() {
    return (
      <div className="result">
        {this.props.books.map((elem) => <Item elem={elem} key={elem._id} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    books: state.userBooks,
  };
}

export default connect(mapStateToProps, { getMyBooks })(BestBooks);

