import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMyBooks } from '../actions/actions';
import Item from './Item';
import EditForm from './EditForm';


class BestBooks extends Component {
  componentDidMount() {
    this.props.getMyBooks(this.props.user.email);
  }
  render() {
    return (
      <div className="result">
        {this.props.books.map((elem) => <Item elem={elem} key={elem._id} />)}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <EditForm />
            </div>
          </div>
        </div>
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

