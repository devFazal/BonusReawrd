// src/services/api.js
export const fetchTransactions = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("/data/transactions.json")
          .then(res => {
            if (!res.ok) throw new Error("Network error");
            return res.json();
          })
          .then(resolve)
          .catch(reject);
      }, 1000); // Simulate network delay
    });
  };
  