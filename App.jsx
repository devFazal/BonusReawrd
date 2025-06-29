// src/App.js
import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchTransactions } from "./services/api";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import logger from "./logger/logger";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        logger.info("Transactions fetched successfully.");
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch transactions.");
        logger.error(err);
        setLoading(false);
      });
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        Customer Rewards Program
      </Typography>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <CustomerList
            transactions={transactions}
            onCustomerSelect={handleCustomerSelect}
            selectedCustomer={selectedCustomer}
          />
          {selectedCustomer && (
            <CustomerDetails
              transactions={transactions}
              selectedCustomer={selectedCustomer}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default App;
