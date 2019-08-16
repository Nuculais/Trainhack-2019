import { createStore } from 'redux';
import middlewares from './middlewares';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    middlewares
  );
};

export default configureStore;
