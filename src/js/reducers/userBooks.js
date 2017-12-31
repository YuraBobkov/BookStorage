import { ADD_MY_BOOKS } from '../const/const';

export default function userBooks(state = [], action) {
  switch (action.type) {
    case ADD_MY_BOOKS: {
      return action.payload;
    }
    default:
      return state;
  }
}
