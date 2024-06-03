
import React from 'react';
import './App.css';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import Favorites from './components/Favorites';
import { EmployeeProvider } from './EmployeeContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <div className="App">
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </Router>
    </EmployeeProvider>
  );
};

export default App;