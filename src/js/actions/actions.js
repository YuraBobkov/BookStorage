import axios from 'axios';
import { GET_BOOKS, AUTH_USER, UNAUTH_USER, AUTH_ERROR, PICK_BOOKS, GET_MY_BOOKS, AUTH_LIKES } from '../const/const';

const URL = 'http://localhost:8080';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function getUser(token) {
  return function (dispatch) {
    axios.post(`${URL}/get-user`, { token })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.user, likes: response.data.likes });
      })
      .catch((error) => {
        alert(error);
        throw new Error(error.message);
      });
  };
}

export function logIn({ ...args }) {
  return function (dispatch) {
    axios.post(`${URL}/login`, { ...args })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, payload: response.data.user, likes: response.data.likes });
      })
      .catch((error) => {
        dispatch(authError('Wrong login or password'));
      });
  };
}

export function logOut() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
}

export function registration({ ...args }) {
  return function (dispatch) {
    axios.post(`${URL}/register`, { ...args })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, payload: response.data.user, likes: response.data.likes  });
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
}

export function getBooks(q, where) {
  return {
    type: GET_BOOKS,
    payload: q,
    where,
  };
}
export function getMyBooks(userEmail) {
  return {
    type: GET_MY_BOOKS,
    payload: userEmail,
  };
}

export function activeBook(name) {
  return {
    type: PICK_BOOKS,
    payload: name,
  };
}

export function updateBook({ ...args }) {
  return function (dispatch) {
    axios.post(`${URL}/books`, { ...args })
      .then((response) => {
        alert('Книгу успешно изменена');
      })
      .catch((error) => {
        alert(error);
        throw new Error(error.message);
      });
  };
}

export function likeBook(number, user) {
  return function (dispatch) {
    axios.post(`${URL}/set-good-book`, { number, user })
      .then(response => {
        dispatch({ type: AUTH_LIKES, payload: response.data });
      })
      .catch((error) => {
        alert(error);
        throw new Error(error.message);
      });
  };
}

export function unlikeBook(number, user) {
  return function (dispatch) {
    axios.post(`${URL}/del-good-book`, { number, user })
      .then(response => {
        dispatch({ type: AUTH_LIKES, payload: response.data });
      })
      .catch((error) => {
        alert(error);
        throw new Error(error.message);
      });
  };
}

