import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { activeBook, likeBook, unlikeBook } from '../actions/actions';

class Item extends Component {
  renderEditBtn = (name) =>{
    return (
    <button type="button" data-toggle="modal" data-target="#exampleModal">
      <i className="fa fa-pencil-square-o" data-name={name} aria-hidden="true" onClick={e => this.editBook(e)} />
    </button>
    )
  }
  
  like = (e) => {
    e.stopPropagation();
    const elem = e.currentTarget;
    const bookId = elem.getAttribute('data-id');
    // elem.classList.toggle('fa-heart');
    // elem.classList.toggle('fa-heart-o');
    elem.classList.contains('fa-heart-o') ? this.props.likeBook(bookId, this.props.user.email) :
      this.props.unlikeBook(bookId, this.props.user.email);
    
  };
  pickItem = (e) => {
    const elem = e.currentTarget;
    if(!(e.target.tagName === 'A')) {
      elem.classList.toggle('center');
      elem.parentElement.classList.toggle('wrapp');
      elem.querySelector('.description').classList.toggle('none');
    }
  };
  editBook = (e) => {
    e.stopPropagation();
    const bookTitle = e.target.getAttribute('data-name');
    const modalTitle = document.querySelector('#exampleModalLabel');
    modalTitle.innerText = `Edit book: ${bookTitle}`;
    this.props.activeBook(bookTitle)
  };
  render() {
    const { name, picture, author, ganre, description, download, whereBuy, readIn, _id } = this.props.elem;
    return (
      <div className="">
        <div className="item" onClick={e => this.pickItem(e)}>
          <img src={picture} alt={name}/>
          <div className="title">
            <p><b>{name}</b></p>
            <p>{author}</p>
            <p><em>{ganre}</em></p>
            <div className="description none">
              <p>{description}</p>
              <a target="_blank" href={readIn}>Read book</a>
              <a target="_blank" href={whereBuy}>You can buy here</a>
              <a target="_blank" href={download}>Download book</a>
            </div>
          </div>
          <div className="icons">
            <i className={`fa ${this.props.likes.includes(_id) ? 'fa-heart' : 'fa-heart-o'}`}
               data-id={_id}
               aria-hidden="true"
               ref={elem => this.icon = elem}
               onClick={e => this.like(e)}
            />
            {this.props.user.admin ? this.renderEditBtn(name) : null}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    likes: state.auth.likes,
  };
}
function mapActionsToProps(dispatch) {
  return bindActionCreators({ activeBook, likeBook, unlikeBook }, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Item);
