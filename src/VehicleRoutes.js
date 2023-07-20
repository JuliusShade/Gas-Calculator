import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import GasCalculator from './Vehicles';
import './VehicleRoutes.css';

const VehicleRoutes = ({ gasPrice }) => {
  const [routes, setRoutes] = useState([{ id: 1, name: '', vehicles: [] }]);
  const [nextId, setNextId] = useState(2); // Track the next available id

  const handleAddRoute = () => {
    const newRoute = { id: nextId, name: '', vehicles: [] };
    setRoutes(prevRoutes => [...prevRoutes, newRoute]);
    setNextId(prevId => prevId + 1);
  };

  const handleRemoveRoute = (id) => {
    setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== id));
  };

  const handleRouteNameChange = (id, value) => {
    setRoutes(prevRoutes => {
      const updatedRoutes = prevRoutes.map(route => {
        if (route.id === id) {
          return { ...route, name: value };
        }
        return route;
      });
      return updatedRoutes;
    });
  };

  const handleGasCalculatorChange = (id, vehicles) => {
    setRoutes(prevRoutes => {
      const updatedRoutes = prevRoutes.map(route => {
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
              <input
                type="text"
                value={route.name}
                onChange={(e) => handleRouteNameChange(route.id, e.target.value)}
                placeholder="Route Name"
                className="route__name"
              />
              <button className="remove-route-button" onClick={() => handleRemoveRoute(route.id)}>Remove Route</button>
              <GasCalculator
                gasPrice={gasPrice}
                vehicles={route.vehicles}
                onChange={(vehicles) => handleGasCalculatorChange(route.id, vehicles)}
              />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <button className="add-route-button" onClick={handleAddRoute}>Add Route</button>
    </div>
  );
};

export default VehicleRoutes;
