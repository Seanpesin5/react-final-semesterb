import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEmployeeContext } from '../EmployeeContext';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import LoadingSpinner from './LoadnigSpinner';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef();

  useEffect(() => {
    const foundEmployee = employees.find(emp => emp.login.uuid === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
      setLoading(false);
    } else {
      
      fetch(`https://randomuser.me/api/?seed=${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            setEmployee(data.results[0]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching employee:', err);
          setLoading(false);
        });
    }
  }, [id, employees]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [employee]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="employee-details">
      <h2>{employee.name.first} {employee.name.last}</h2>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Address: {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}</p>
      <MapContainer
        center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        whenCreated={mapInstance => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} />
      </MapContainer>
    </div>
  );
};

export default EmployeeDetails;