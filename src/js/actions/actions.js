import axios from 'axios';
import { GET_BOOKS, AUTH_USER, UNAUTH_USER, AUTH_ERROR, PICK_BOOKS, GET_MY_BOOKS} from '../const/const';

const URL = 'http://localhost:8080';
const setToken = (response) => {
  console.log(response)
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('tokenUser', JSON.stringify(response.data.user));
  localStorage.setItem('likedBooks', JSON.stringify(response.data.likes));
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function logIn({ ...args }) {
  return function (dispatch) {
    axios.post(`${URL}/login`, { ...args })
      .then((response) => {
        setToken(response);
        dispatch({ type: AUTH_USER, payload: response.data.user });
      })
      .catch((error) => {
        dispatch(authError('Wrong login or password'));
      });
  };
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenUser');
  localStorage.removeItem('likedBooks');
  return {
    type: UNAUTH_USER,
  };
}

export function registration({ ...args }) {
  return function (dispatch) {
    axios.post(`${URL}/register`, { ...args })
      .then((response) => {
        setToken(response);
        dispatch({ type: AUTH_USER, payload: response.data.user });
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
export function getMyBooks(array) {
  return {
    type: GET_MY_BOOKS,
    payload: array,
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
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
}

export function likeBook(number, user) {
  return function (dispatch) {
    axios.post(`${URL}/likedbooks`, {number, user})
      .then(response => {
        localStorage.setItem('likedBooks', JSON.stringify(response.data));
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error));
      });
  };
}
