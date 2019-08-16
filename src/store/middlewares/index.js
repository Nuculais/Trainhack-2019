import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './logger';

export default applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
);
