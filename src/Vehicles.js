import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Vehicles.css';

const GasCalculator = ({ gasPrice }) => {
  const [vehicles, setVehicles] = useState([]);
  const [totalGasPrice, setTotalGasPrice] = useState(0);
  const [individualVehiclePrices, setIndividualVehiclePrices] = useState([]);
  const [showCalculation, setShowCalculation] = useState(false);
  const [percentile, setPercentile] = useState('');

  const handleAddVehicle = () => {
    setVehicles((prevVehicles) => [...prevVehicles, { mpg: '', miles: '' }]);
  };

  const handleRemoveVehicle = (index) => {
    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles];
      updatedVehicles.splice(index, 1);
      return updatedVehicles;
    });
  };

  const handleMpgChange = (index, value) => {
    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles];
      updatedVehicles[index].mpg = value;
      return updatedVehicles;
    });
  };

  const handleMilesChange = (index, value) => {
    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles];
      updatedVehicles[index].miles = value;
      return updatedVehicles;
    });
  };

  const handlePercentileChange = (e) => {
    setPercentile(+e.target.value);
  };

  const handleCalculate = () => {
    const updatedIndividualVehiclePrices = vehicles.map((vehicle) => {
      const gallons = vehicle.miles / vehicle.mpg;
      const vehicleGasPrice = gallons * gasPrice * (1 + percentile / 100); // Include the percentile here
      return vehicleGasPrice;
    });

    const updatedTotalGasPrice = updatedIndividualVehiclePrices.reduce((total, price) => total + price, 0);

    setIndividualVehiclePrices(updatedIndividualVehiclePrices);
    setTotalGasPrice(updatedTotalGasPrice);
    setShowCalculation(true);
  };

  return (
    <div className="container">
      <button className="add-vehicle-btn" onClick={handleAddVehicle}>Add Vehicle</button>
      <TransitionGroup>
        {vehicles.map((vehicle, index) => (
          <CSSTransition key={index} classNames="vehicle-item" timeout={300}>
            <div className="miles-inputs">
              <div className="input-group">
                <input
                  type="number"
                  value={vehicle.mpg}
                  onChange={(e) => handleMpgChange(index, +e.target.value)}
                  placeholder="MPG"
                  className="mpg-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  value={vehicle.miles}
                  onChange={(e) => handleMilesChange(index, +e.target.value)}
                  placeholder="Total Miles"
                  className="miles-input"
                />
              </div>
              <button className="remove-vehicle-btn" onClick={() => handleRemoveVehicle(index)}>Remove Vehicle</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <button className="calculate-btn" onClick={handleCalculate}>Calculate</button>
      <div className="gas-total-container">
        <div className={`calculation-container ${showCalculation ? 'show' : ''}`}>
            <h2 className="calculation-title">Total Gas Price</h2>
            <div className={`calculation-value ${showCalculation ? 'show' : ''}`}>{`$${totalGasPrice.toFixed(2)}`}</div>
        </div>

        <div className={`calculation-container ${showCalculation ? 'show' : ''}`}>
        <input
            type="number"
            value={percentile}
            onChange={handlePercentileChange}
            placeholder="% Total Change"
            className="percentile-input"
        />
        </div>
      </div>
        <h2 className="calculation-title">Individual Vehicle Prices</h2>
        {individualVehiclePrices.map((price, index) => (
          <div key={index} className={`calculation-value ${showCalculation ? 'show' : ''}`}>{`Vehicle ${index + 1}: $${price.toFixed(2)}`}</div>
        ))}
    </div>
  );
};

export default GasCalculator;
