// src/utils/__tests__/rewardCalculatorWithData.test.js
import { describe, it, expect } from "vitest";
import { calculatePoints } from "../rewardCalculator";

// ✅ Sample test transactions
const testTransactions = [
  { amount: 45, expected: 0 }, 
  { amount: 50, expected: 0 }, 
  { amount: 75, expected: 25 },
  { amount: 100, expected: 50 }, 
  { amount: 120, expected: 90 }, 
  { amount: 120.75, expected: 91 }, 
  { amount: 200, expected: 250 }, 
  { amount: -10, expected: 0 }, 
  { amount: 0, expected: 0 }, 
  { amount: 300.99, expected: 451 }, 
  { amount: "abc", expected: 0 }, 
];

describe("calculatePoints with real transaction-like data", () => {
  testTransactions.forEach(({ amount, expected }) => {
    it(`should return ${expected} points for amount $${amount}`, () => {
      const result = calculatePoints(Number(amount));
      expect(result).toBe(expected);
    });
  });
});
