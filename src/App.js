import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './Calculator';
import VehicleRoutes from './VehicleRoutes'; // Correct the import statement
import ParticlesBackground from './ParticlesBackground';

function App() {
  const [gasPrice, setGasPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        // Your API call to fetch gas price data
        // Replace this with the actual API endpoint
        const response = await fetch('http://localhost:3001/api/gas-price');
        const data = await response.json();

        if (response.ok) {
          setGasPrice(data.gasPrice);
        } else {
          console.log('API request failed:', data.error);
        }
      } catch (error) {
        console.log('API request error:', error);
      }

      setLoading(false);
    };

    fetchGasPrice();
  }, []);

  return (
    <div className="App">
      <ParticlesBackground />
      {loading ? (
        <div className="loading-text">Loading Application...</div>
      ) : (
        <div className="content-container">
          <div className="calculator-container">
            <Calculator gasPrice={gasPrice} setGasPrice={setGasPrice} />
          </div>
          <div className="routes-container">
            <VehicleRoutes gasPrice={gasPrice} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
