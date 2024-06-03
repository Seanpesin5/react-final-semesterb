
import React from 'react';
import { useEmployeeContext } from '../EmployeeContext';

const EmployeeItem = ({ employee }) => {
  const { favorites, setFavorites } = useEmployeeContext();

  const isFavorite = favorites.some(fav => fav.login.uuid === employee.login.uuid);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.login.uuid !== employee.login.uuid));
    } else {
      setFavorites([...favorites, employee]);
    }
  };

  return (
    <div className="employee-item">
      <img src={employee.picture.thumbnail} alt={employee.name.first} />
      <h3>{employee.name.first} {employee.name.last}</h3>
      <p>Age: {employee.dob.age}</p>
      <p>Location: {employee.location.city}, {employee.location.state}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <a href={`/employee/${employee.login.uuid}`}>More details</a>
    </div>
  );
};

export default EmployeeItem;
