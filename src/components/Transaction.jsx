// src/components/TransactionTable.js
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewardCalculator";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import { MONTHS } from "../utils/constants";

function Transaction({ transactions, selectedMonth, selectedYear, showAll }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isWithinLast3Months = (date) => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return date >= threeMonthsAgo;
  };

  const filteredTxns = useMemo(() => {
    if (showAll) {
      return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return transactions.filter((t) => {
      const date = new Date(t.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const matchYear = year === parseInt(selectedYear);
      const matchMonth =
        selectedMonth === ""
          ? isWithinLast3Months(date)
          : parseInt(selectedMonth) === month;
      return matchYear && matchMonth;
    });
  }, [transactions, selectedMonth, selectedYear, showAll]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  if (!filteredTxns.length)
    return <Typography variant="body1">No transactions</Typography>;

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount ($)</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Reward Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTxns
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((txn) => {
                const date = new Date(txn.date);
                const readableDate = `${date.getDate()} ${
                  MONTHS[date.getMonth()]
                } ${date.getFullYear()}`;
                return (
                  <TableRow key={txn.transactionId}>
                    <TableCell>{readableDate}</TableCell>
                    <TableCell>{txn.transactionId}</TableCell>
                    <TableCell>${txn.amount.toFixed(2)}</TableCell>
                    <TableCell>{calculatePoints(txn.amount)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredTxns.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.number.isRequired,
  showAll: PropTypes.bool,
};

export default Transaction;
