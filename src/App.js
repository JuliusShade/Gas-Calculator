import React, { useEffect } from 'react';
import './App.css';
import Calculator from './Calculator';
import GasCalculatorRoute from './VehicleRoutes';
import ParticlesBackground from './ParticlesBackground';

function App() {
  const [gasPrice, setGasPrice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/gas-price');
        const data = await response.json();
        console.log('API response:', data);

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
      {!loading ? (
        <>
          <Calculator gasPrice={gasPrice} />
          <GasCalculatorRoute gasPrice={gasPrice} />
        </>
      ) : (
        <div>Loading gas price...</div>
      )}
    </div>
  );
}

export default App;
