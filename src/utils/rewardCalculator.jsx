// src/utils/rewardCalculator.js
export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2; // 2 points per $ over 100
    points += 50; // 1 point per $50-$100
  } else if (amount > 50) {
    points += amount - 50;
  }
  return Math.floor(points); // discard fractions
};
