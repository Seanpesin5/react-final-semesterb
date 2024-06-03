
import React from 'react';
import { useEmployeeContext } from '../EmployeeContext';
import EmployeeItem from './EmployeeItem';

const Favorites = () => {
  const { favorites } = useEmployeeContext();

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No favorite employees.</p>
        </div>
      ) : (
        favorites.map(employee => (
          <EmployeeItem key={employee.login.uuid} employee={employee} />
        ))
      )}
    </div>
  );
};

export default Favorites;
