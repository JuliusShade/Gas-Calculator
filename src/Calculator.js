import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGasPrice } from './actions';
import './Calculator.css';
import FirstDiversity from './Pictures/First-Diversity-Logo.png'

const Calculator = () => {
  const gasPrice = useSelector(state => state.gasPrice);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGasPrice());
  }, [dispatch]);

  const handleFetchGasPrice = () => {
    dispatch(fetchGasPrice());
  };

  return (
    <div className="calculator-container">
      <div className="header">
        <img src={FirstDiversity} className="logo" alt="First Diversity Logo"/>
        {loading ? (
          <button disabled>Loading...</button>
        ) : (
          <>
            <button className="fetch-button" onClick={handleFetchGasPrice}>Fetch Gas Price</button>
            <div className="gas-price">Gas price: ${gasPrice}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
