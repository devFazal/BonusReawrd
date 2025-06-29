// src/components/CustomerDetails.js
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewardCalculator";
import { MONTHS } from "../utils/constants";
import FilterBar from "./FilterBar";
import Transaction from "./Transaction";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";

function CustomerDetails({ transactions, selectedCustomer }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showAll, setShowAll] = useState(false); // New toggle state

  const customerTxns = useMemo(() => {
    return transactions.filter((t) => t.customerId === selectedCustomer);
  }, [transactions, selectedCustomer]);

  useEffect(() => {
    if (customerTxns.length) {
      const latest = [...customerTxns].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];
      const latestDate = new Date(latest.date);
      setSelectedYear(latestDate.getFullYear());
      setSelectedMonth("");
      setShowAll(false); // Reset to default when customer changes
    }
  }, [selectedCustomer, customerTxns]);

  const rewardsByMonth = useMemo(() => {
    const summary = {};
    customerTxns.forEach((t) => {
      const date = new Date(t.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (!summary[year]) summary[year] = {};
      if (!summary[year][month]) summary[year][month] = 0;
      summary[year][month] += calculatePoints(t.amount);
    });
    return summary;
  }, [customerTxns]);

  const totalPoints = useMemo(() => {
    return customerTxns.reduce((sum, t) => sum + calculatePoints(t.amount), 0);
  }, [customerTxns]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Customer: {selectedCustomer}
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Typography variant="h6" color="secondary">
          Total Reward Points: {totalPoints}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Monthly Rewards (Year {selectedYear})
        </Typography>
        <List dense>
          {rewardsByMonth[selectedYear] ? (
            Object.entries(rewardsByMonth[selectedYear]).map(
              ([month, points]) => (
                <ListItem key={month} disableGutters>
                  <ListItemText
                    primary={`${MONTHS[month]}: ${points} points`}
                  />
                </ListItem>
              )
            )
          ) : (
            <ListItem>
              <ListItemText primary="No rewards this year" />
            </ListItem>
          )}
        </List>
      </Paper>

      <FilterBar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      <FormControlLabel
        control={
          <Switch
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            color="primary"
          />
        }
        label="Show All Transactions"
        sx={{ mb: 2 }}
      />

      <Transaction
        transactions={customerTxns}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        showAll={showAll}
      />
    </Box>
  );
}

CustomerDetails.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedCustomer: PropTypes.string.isRequired,
};

export default CustomerDetails;
