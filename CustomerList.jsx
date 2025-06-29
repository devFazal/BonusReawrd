// src/components/CustomerList.js
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";

function CustomerList({ transactions, onCustomerSelect, selectedCustomer }) {
  const customers = useMemo(() => {
    const unique = {};
    transactions.forEach((t) => {
      if (!unique[t.customerId]) {
        unique[t.customerId] = [];
      }
      unique[t.customerId].push(t);
    });
    return Object.entries(unique).map(([id, txns]) => ({
      customerId: id,
      count: txns.length,
    }));
  }, [transactions]);

  return (
    <Paper sx={{ mb: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Select a Customer
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="customer-select-label">Customer</InputLabel>
        <Select
          labelId="customer-select-label"
          value={selectedCustomer || ""}
          onChange={(e) => onCustomerSelect(e.target.value)}
          label="Customer"
        >
          {customers.map((cust) => (
            <MenuItem key={cust.customerId} value={cust.customerId}>
              {cust.customerId} ({cust.count} txns)
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

CustomerList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onCustomerSelect: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.string,
};

export default CustomerList;
