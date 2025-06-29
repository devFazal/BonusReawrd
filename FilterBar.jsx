// src/components/FilterBar.js
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { MONTHS, YEARS } from "../utils/constants";

function FilterBar({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
      <Typography variant="subtitle1">Filter:</Typography>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          label="Month"
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {MONTHS.map((month, index) => (
            <MenuItem key={month} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          label="Year"
          onChange={(e) => onYearChange(e.target.value)}
        >
          {YEARS.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

FilterBar.propTypes = {
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.number,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default FilterBar;
