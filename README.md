# Customer Rewards Program – React App

This project calculates and displays reward points earned by customers based on their transactions over time.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running the App](#running-the-app)
- [Components](#components)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- Simulated API fetch from local JSON
- Reward logic:
  - 2 points for every $1 over $100
  - 1 point for every $1 between $50 and $100
- Filter by month & year
- Show total and monthly reward points
- Toggle to show only last 3 months or all transactions
- Pagination for long transaction lists
- MUI-themed UI for business appearance
- Positive and negative unit tests
- Logging using `pino`

---

## Project Structure

```
src/
├── components/
│   ├── CustomerList.js
│   ├── CustomerDetails.js
│   ├── FilterBar.js
│   └── TransactionTable.js
├── utils/
│   ├── rewardCalculator.js
│   └── constants.js
├── services/
│   └── api.js
├── logger/
│   └── logger.js
├── App.js
├── index.js
└── theme.js
```

---

## Tech Stack

- React 18+
- Vite
- Material UI (MUI)
- Pino (logging)
- Vitest (unit testing)

---

## Setup Instructions

1. **Clone the repo**

   ```
   git clone https://github.com/yourusername/customer-rewards.git
   cd customer-rewards
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Start the development server**

   ```
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## Component Details

| Component          | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `CustomerList`     | Dropdown to select customer                        |
| `CustomerDetails`  | Shows total and monthly reward points              |
| `FilterBar`        | Filter transactions by month and year              |
| `TransactionTable` | Paginated table of transactions with reward points |

---

## Testing

**Run All Tests:**
npm test

Tests are located in:

```
src/utils/__tests__/
```

Includes:

- Whole number and fractional cases
- Positive & negative values
- Edge cases (invalid input, negative amount)

---

## Screenshots

### UI View:

![App Screenshot](public/ScreenShots/UIReactAssignment.png)

### Reward Breakdown:

![Reward Details](public/ScreenShots/RewardDetails.png)

### Test Case Success:

![Test Success](public/ScreenShots/TestReactAssignment.png)

---
