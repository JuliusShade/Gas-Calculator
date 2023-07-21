// actions.js

// Action types
export const SET_GAS_PRICE = 'SET_GAS_PRICE';
export const FETCH_GAS_PRICE_REQUEST = 'FETCH_GAS_PRICE_REQUEST';
export const FETCH_GAS_PRICE_SUCCESS = 'FETCH_GAS_PRICE_SUCCESS';
export const FETCH_GAS_PRICE_FAILURE = 'FETCH_GAS_PRICE_FAILURE';

// Action creators
export const setGasPrice = (gasPrice) => ({
  type: SET_GAS_PRICE,
  payload: gasPrice,
});

export const fetchGasPriceRequest = () => ({
  type: FETCH_GAS_PRICE_REQUEST,
});

export const fetchGasPriceSuccess = (gasPrice) => ({
  type: FETCH_GAS_PRICE_SUCCESS,
  payload: gasPrice,
});

export const fetchGasPriceFailure = (error) => ({
  type: FETCH_GAS_PRICE_FAILURE,
  payload: error,
});

export const fetchGasPrice = () => {
  return async (dispatch) => {
    dispatch(fetchGasPriceRequest());
    try {
      const response = await fetch('https://gas-data-scraper-cc40184cf881.herokuapp.com/api/gas-price');
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchGasPriceSuccess(data.gasPrice));
      } else {
        dispatch(fetchGasPriceFailure(data.error));
      }
    } catch (error) {
      dispatch(fetchGasPriceFailure('API request error'));
    }
  };
};
