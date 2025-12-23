import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";
import { apiService } from "../services/apiService";

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchTransactions function
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // TODO: Call apiService.getTransactions with account address if available
        // TODO: Update transactions state
        const res = await apiService.getTransactions(account);
        const transactions = res.transactions;
        setTransactions(transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account]);

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatDate = (timestamp) => {
    // TODO: Format the timestamp to a readable date
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-history-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter">
            Filtering for: {formatAddress(account)}
          </div>
        )}
      </div>

      {/* TODO: Display transactions list */}
      {/* Show: type, from, to, amount, currency, status, timestamp, blockchainTxHash */}
      <div className="transactions-list">
        {/* Your implementation here */}
        {transactions.length ? (
          transactions.map((transaction) => (
            <div className="transaction-card" key={transaction.id}>
              <div className="transaction-header-info">
                <span className={`transaction-type ${transaction.type}`}>
                  {transaction.type}
                </span>
                <span className={`transaction-status ${transaction.status}`}>
                  {transaction.status}
                </span>
              </div>

              <div className="transaction-details">
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">From</span>
                  <span className="transaction-detail-value address">
                    {transaction.from}
                  </span>
                </div>
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">To</span>
                  <span className="transaction-detail-value address">
                    {transaction.to}
                  </span>
                </div>
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">Amount</span>
                  <span className="transaction-amount">
                    {transaction.amount} {transaction.currency}
                  </span>
                </div>
              </div>

              <div className="transaction-detail-value hash">
                {transaction.blockchainTxHash}
              </div>
              <p className="transaction-timestamp">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
          ))
        ) : (
          <div className="placeholder">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
