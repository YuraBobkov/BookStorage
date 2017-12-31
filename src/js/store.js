import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';

import request from './middleware';
import books from './reducers/books';
import userBooks from './reducers/userBooks';
import authReducer from './reducers/auth';



const store = createStore(
  combineReducers({
    auth: authReducer,
    userBooks,
    books,
    form: formReducer,
  }),
  composeWithDevTools(applyMiddleware(
    promise(),
    thunk,
    logger,
    request,
  )),
);

export default store;
