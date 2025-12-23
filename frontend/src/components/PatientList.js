import React, { useState, useEffect, useRef } from "react";
import "./PatientList.css";
import { apiService } from "../services/apiService";

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // TODO: Implement the fetchPatients function
  // This function should:
  // 1. Call apiService.getPatients with appropriate parameters (page, limit, search)
  // 2. Update the patients state with the response data
  // 3. Update the pagination state
  // 4. Handle loading and error states
  const fetchPatients = async () => {
    // Your implementation here
    setLoading(true);
    try {
      // TODO: Call API and update state
      const { pagination, patients } = await apiService.getPatients(
        currentPage,
        10,
        searchTerm
      );

      setPatients(patients);
      setPagination(pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("fetching patients");
      fetchPatients();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]);

  // TODO: Implement search functionality
  // Add a debounce or handle search input changes
  const handleSearch = (e) => {
    // Your implementation here
    setSearchTerm(e);
  };

  // moved "if loading" and "if error" to prevent input from unmounting when fetch request starts

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        {/* TODO: Add search input field */}
        <input
          type="text"
          placeholder="Search patients..."
          className="search-input"
          // TODO: Add value, onChange handlers
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* TODO: Implement patient list display */}
      {/* Map through patients and display them */}
      {/* Each patient should be clickable and call onSelectPatient with patient.id */}
      <div className="patient-list">
        {loading ? (
          <div className="loading">Loading patients...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : patients.length ? (
          patients.map((patient) => (
            <div
              className="patient-card"
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
            >
              <div className="patient-card-header">
                <p className="patient-card-name">{patient.name}</p>
                <p className="patient-id">{patient.patientId}</p>
              </div>
              <div className="patient-info">
                <p className="patient-info-item">{patient.address}</p>
                <p className="patient-info-item">{patient.phone}</p>
                <p className="patient-info-item">{patient.email}</p>
                <p className="patient-info-item">{patient.dateOfBirth}</p>
                <p className="patient-info-item">{patient.gender}</p>
                <p className="patient-wallet">{patient.walletAddress}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="placeholder">
            <p>No patients found</p>
          </div>
        )}
      </div>

      {/* TODO: Implement pagination controls */}
      {/* Show pagination buttons if pagination data is available */}
      {pagination && (
        <div className="pagination">
          {/* Your pagination implementation here */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={currentPage === pagination.totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
