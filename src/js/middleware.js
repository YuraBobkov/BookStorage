import axios from 'axios';
import { GET_BOOKS, ADD_BOOKS, GET_MY_BOOKS, ADD_MY_BOOKS } from './const/const';

const makeRequest = (URL) => {
  return fetch(URL)
    .then(res => res.json())
    .catch((error) => {
      alert(error);
      throw new Error(error.message);
    });
};
const filterBooks = (books, query, where) =>
  books.filter(elem =>
    elem[where].toString().toLowerCase().includes(query.toString().toLowerCase()));


export default function request(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case GET_BOOKS: {
          makeRequest('http://localhost:8080/books')
            .then(data => filterBooks(data, action.payload, action.where))
            .then((body) => {
              store.dispatch({
                type: ADD_BOOKS,
                payload: body,
              });
            });
          break;
        }
        case GET_MY_BOOKS: {
          console.log(action);
          axios.post('http://localhost:8080/mybooks', {email: action.payload} )
            .then((res) => {
              console.log(res)
              store.dispatch({
                type: ADD_MY_BOOKS,
                payload: res.data,
              });
            });
          break;
        }
      }
      return next(action);
    };
  } ;
}
