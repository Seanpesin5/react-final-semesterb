
import React, { useState } from 'react';
import { useEmployeeContext } from '../EmployeeContext';
import EmployeeItem from './EmployeeItem';
import LoadingSpinner from './LoadnigSpinner';

const Home = () => {
  const { employees, setEmployees, error, setError } = useEmployeeContext();
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {

    const companyList = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Facebook']; 
    setCompanies(companyList.filter(company => company.toLowerCase().includes(query.toLowerCase())));
  };

  const fetchEmployees = async (company) => {
    const seed = `abc-${company}`; 
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10&seed=${seed}`);
      const data = await response.json();
      setEmployees(data.results);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
      setLoading(false);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCompanies([]);
    setQuery(company);
    fetchEmployees(company);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCompanies();
          }}
          placeholder="Enter company name"
        />
        <button onClick={() => fetchEmployees(selectedCompany)} disabled={!selectedCompany}>Search</button>
        {companies.length > 0 && (
          <ul className="company-list">
            {companies.map((company) => (
              <li key={company} onClick={() => handleCompanySelect(company)}>
                {company}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="employee-list">
          {employees.map((employee) => (
            <EmployeeItem key={employee.login.uuid} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
