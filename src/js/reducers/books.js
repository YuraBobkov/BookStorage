import { ADD_BOOKS, ADD_MY_BOOKS } from '../const/const';

export default function books(state = [], action) {
  switch (action.type) {
    case ADD_BOOKS: {
      return action.payload;
    }
    default:
      return state;
  }
}
