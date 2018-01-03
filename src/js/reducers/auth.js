import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, PICK_BOOKS } from '../const/const';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, user: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, likes: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PICK_BOOKS: {
      return { ...state, activeBook: action.payload };
    }
    default:
      return state;
  }
}
