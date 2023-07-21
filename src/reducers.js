import { combineReducers } from 'redux';
import {
  SET_GAS_PRICE,
  FETCH_GAS_PRICE_REQUEST,
  FETCH_GAS_PRICE_SUCCESS,
  FETCH_GAS_PRICE_FAILURE,
} from './actions';

const initialState = {
  gasPrice: null,
  loading: false,
  error: null,
};

const gasPriceReducer = (state = initialState.gasPrice, action) => {
  switch (action.type) {
    case SET_GAS_PRICE:
    case FETCH_GAS_PRICE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case FETCH_GAS_PRICE_REQUEST:
      return true;
    case FETCH_GAS_PRICE_SUCCESS:
    case FETCH_GAS_PRICE_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_GAS_PRICE_REQUEST:
    case FETCH_GAS_PRICE_SUCCESS:
      return null;
    case FETCH_GAS_PRICE_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    gasPrice: gasPriceReducer,
    loading: loadingReducer,
    error: errorReducer,
  });

export { rootReducer };