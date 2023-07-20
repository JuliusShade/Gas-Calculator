import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // (optional) If you need asynchronous actions
import rootReducer from './reducers';

// Define your reducers (if needed)
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

export default store;
