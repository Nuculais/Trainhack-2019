import { createLogger } from 'redux-logger';

let loggerMiddleware = store => next => action => next(action);
if (process.env.NODE_ENV === 'development') {
  loggerMiddleware = createLogger();
}

export default loggerMiddleware;
