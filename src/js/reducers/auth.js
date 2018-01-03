import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, PICK_BOOKS, AUTH_LIKES } from '../const/const';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, user: action.payload, likes: action.likes };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, likes: null };
    case AUTH_LIKES:
      return { ...state, likes: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PICK_BOOKS: {
      return { ...state, activeBook: action.payload };
    }
    default:
      return state;
  }
}
