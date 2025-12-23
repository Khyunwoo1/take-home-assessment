import React, { useState, useEffect } from "react";
import "./PatientDetail.css";
import { apiService } from "../services/apiService";

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchPatientData function
  // This should fetch both patient details and their records
  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        // TODO: Fetch patient data using apiService.getPatient(patientId)
        // TODO: Fetch patient records using apiService.getPatientRecords(patientId)
        // TODO: Update state with fetched data
        const data = await apiService.getPatient(patientId);
        const records = await apiService.getPatientRecords(patientId);
        setPatient(data);
        setRecords(records.records);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">
          Error loading patient: {error || "Patient not found"}
        </div>
        <button onClick={onBack} className="back-btn">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">
          ← Back to List
        </button>
      </div>

      <div className="patient-detail-content">
        {/* TODO: Display patient information */}
        {/* Show: name, email, dateOfBirth, gender, phone, address, walletAddress */}
        <div className="patient-info-section">
          <h2>Patient Information</h2>
          {/* Your implementation here */}
          {patient ? (
            <div className="patient-info-grid">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{patient.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{patient.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">{patient.dateOfBirth}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">{patient.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{patient.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{patient.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Wallet Address</span>
                <span className="info-value wallet">
                  {patient.walletAddress}
                </span>
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <p>Display patient information here</p>
            </div>
          )}
        </div>

        {/* TODO: Display patient records */}
        {/* Show list of medical records with: type, title, date, doctor, hospital, status */}
        <div className="patient-records-section">
          <h2>Medical Records ({records.length})</h2>
          {/* Your implementation here */}
          {records.length ? (
            records.map((record) => {
              return (
                <div className="record-card" key={record.id}>
                  <div className="record-header">
                    <span className="record-title">{record.title}</span>
                    <span
                      className={`record-type ${record.type.toLowerCase()}`}
                    >
                      {record.type}
                    </span>
                  </div>
                  <p className="record-description">{record.description}</p>
                  <div className="record-meta">
                    <span className="record-meta-item">
                      <strong>Date:</strong> {record.date}
                    </span>
                    <span className="record-meta-item">
                      <strong>Doctor:</strong> {record.doctor}
                    </span>
                    <span className="record-meta-item">
                      <strong>Hospital:</strong> {record.hospital}
                    </span>
                  </div>
                  <span className={`record-status ${record.status}`}>
                    {record.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="placeholder">
              <p>Display medical records here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
