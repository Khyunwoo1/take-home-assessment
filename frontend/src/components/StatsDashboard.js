import React, { useState, useEffect } from "react";
import "./StatsDashboard.css";
import { apiService } from "../services/apiService";

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchStats function
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // TODO: Call apiService.getStats()
        // TODO: Update stats state
        const res = await apiService.getStats();
        setStats(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">
          Error loading statistics: {error || "No data available"}
        </div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>

      {/* TODO: Display statistics in a nice grid layout */}
      {/* Show: totalPatients, totalRecords, totalConsents, activeConsents, pendingConsents, totalTransactions */}
      <div className="stats-grid">
        {/* Your implementation here */}
        {stats ? (
          <>
            <div className="stat-card">
              <div className="stat-label">Total Patients</div>
              <div className="stat-value">{stats.totalPatients}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Total Records</div>
              <div className="stat-value">{stats.totalRecords}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Total Consents</div>
              <div className="stat-value">{stats.totalConsents}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Active Consents</div>
              <div className="stat-value">{stats.activeConsents}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Pending Consents</div>
              <div className="stat-value">{stats.pendingConsents}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Total Transactions</div>
              <div className="stat-value">{stats.totalTransactions}</div>
            </div>
          </>
        ) : (
          <div className="placeholder">
            <p>Statistics will be displayed here</p>
            <p>Implement the statistics dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsDashboard;
