import React, { useState } from 'react';
import './Calculator.css';
import FirstDiversity from './Pictures/First-Diversity-Logo.png';

const Calculator = ({ setGasPrice }) => {
  const [localGasPrice, setLocalGasPrice] = useState('');
  const [lastGasPrice, setLastGasPrice] = useState(null);

  const handleGasPriceChange = (event) => {
    setLocalGasPrice(event.target.value);
  };

  const handleSetGasPrice = () => {
    const newGasPrice = parseFloat(localGasPrice); // Convert to a floating-point number
    setGasPrice(newGasPrice);
    setLastGasPrice(newGasPrice.toFixed(2)); // Update the lastGasPrice state with 2 decimal places
  };

  return (
    <div className="calculator-container">
      <div className="header">
        <img src={FirstDiversity} className="logo" alt="First Diversity Logo" />
        {lastGasPrice !== null && (
          <div className="last-gas-price">Last Gas Price: ${lastGasPrice}</div>
        )}
        <div className="gas-price-input">
          <input
            type="number"
            placeholder="Enter Gas Price"
            value={localGasPrice}
            onChange={handleGasPriceChange}
            className="gas-input"
          />
          <button onClick={handleSetGasPrice} className="fetch-button">Set Gas Price</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
