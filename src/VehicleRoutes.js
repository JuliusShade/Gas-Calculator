import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import GasCalculator from './Vehicles'; // Assuming this is the correct import for the Vehicles.js component
import './VehicleRoutes.css';

const VehicleRoutes = ({ gasPrice }) => {
  const [routes, setRoutes] = useState([{ id: 1, name: '', vehicles: [] }]);
  const [nextId, setNextId] = useState(2); // Track the next available id

  const handleAddRoute = () => {
    const newRoute = { id: nextId, name: '', vehicles: [] };
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    setNextId((prevId) => prevId + 1);
  };

  const handleGasCalculatorChange = (id, vehicles) => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = prevRoutes.map((route) => {
        if (route.id === id) {
          return { ...route, vehicles: vehicles };
        }
        return route;
      });
      return updatedRoutes;
    });
  };

  return (
    <div className="vehicle-routes-container">
      <TransitionGroup>
        {routes.map((route) => (
          <CSSTransition key={route.id} classNames="route" timeout={500}>
            <div className="route">
              {/* Existing code */}
              <GasCalculator
                gasPrice={gasPrice} // Pass the gasPrice prop to the GasCalculator component
                vehicles={route.vehicles}
                setVehicles={(updatedVehicles) =>
                  handleGasCalculatorChange(route.id, updatedVehicles)
                }
              />
              {/* Existing code */}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <button className="add-route-button" onClick={handleAddRoute}>
        Add Route
      </button>
    </div>
  );
};

export default VehicleRoutes;
