import React, { Component } from 'react';
import { connect } from 'react-redux';


import { activeBook, likeBook } from '../actions/actions';


class Item extends Component {
  // componentDidMount(){
  //   this.icon.addEventListener("click", (e) => this.like(e));
  // }
  // componentWillUnmount() {
  //   this.icon.removeEventListener("click", (e) => this.like(e));
  // }
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
    const user = JSON.parse(localStorage.getItem('tokenUser')).email
    elem.classList.toggle('fa-heart');
    elem.classList.toggle('fa-heart-o');
    this.props.likeBook(bookId, user);
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
    const liked = JSON.parse(localStorage.getItem("likedBooks"));
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
            <i className={`fa ${liked.includes(_id) ? 'fa-heart' : 'fa-heart-o'}`}
               data-id={_id}
               aria-hidden="true"
               ref={elem => this.icon = elem}
               onClick={e => this.like(e)}
            />
            {this.props.admin ? this.renderEditBtn(name) : null}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    admin: state.auth.user.admin,
  };
}
export default connect(mapStateToProps, { activeBook, likeBook })(Item);
