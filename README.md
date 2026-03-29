# Local Chain Manager

A lightweight blockchain transaction manager for local development and testing.
This project simulates a blockchain environment with blocks, transactions, status tracking, and persistence to JSON files.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Folder Structure](#folder-structure)
* [Installation](#installation)
* [Usage](#usage)

  * [Backend](#backend)
  * [Frontend](#frontend)
* [API Endpoints](#api-endpoints)
* [Data Persistence](#data-persistence)
* [Transaction Status](#transaction-status)
* [License](#license)

---

## Project Overview

The Local Chain Manager allows you to:

* Create, store, and manage blockchain-like transactions.
* Filter transactions by addresses, amounts, dates, or status.
* Persist blockchain state to a JSON file (`blockchain.json`) across sessions.
* Clear blockchain data for fresh testing.
* Simulate transaction confirmation status (`PENDING`, `CONFIRMED`, `CANCELLED`).

This is ideal for development, testing smart contract interactions, and experimenting with transaction management.



## Features

* **Blockchain Simulation** – Blocks containing multiple transactions.
* **Transaction Management** – Add, fetch, and filter transactions.
* **Status Tracking** – Track PENDING, CONFIRMED, and CANCELLED transactions.
* **Persistence** – Save and load blockchain state to `blockchain.json`.
* **Clear Blockchain** – Reset data with a single API call.
* **Frontend Interface** – Search and display transactions in a table.



## Folder Structure

```
Local_Chain_Manager/
├─ Backend/
│  ├─ controllers/        # API logic for transactions
│  ├─ middleware/         # Validation middleware
│  ├─ models/             # Blockchain, Block, Transaction models
│  ├─ routes/             # Express routes
│  ├─ services/           # Persistence (save/load/clear)
│  └─ utils/              # Logger and response helpers
├─ src/                   # Frontend React app
│  ├─ Components/         # React components
│  ├─ Styles/             # CSS files
│  ├─ api/                # API calls to backend
│  └─ hooks/              # Custom React hooks
├─ blockchain.json        # Persistent blockchain state
├─ server.js              # Backend server entry
├─ package.json
└─ README.md
```



## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Local_Chain_Manager.git
cd Local_Chain_Manager
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node server.js
```

4. Start the frontend (Vite-based):

```bash

npm run dev
```

> Make sure you have Node.js v22+ installed.



## Usage

### Backend

The backend runs on `http://localhost:3000` (or configured port).

Available endpoints:

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/transactions` | Fetch transactions (filterable) |
| POST   | `/api/transactions` | Create a new transaction        |
| DELETE | `/api/transactions` | Clear the blockchain            |

---

### Frontend
* `create_tx.js` - create regular transaction (saved and loaded through blockchain.json)
* `src/Components/TransactionSearch.jsx` – Search transactions by filters.
* `src/Components/SearchResults.jsx` – Display search results in a table.
* `src/Components/BlockchainTransaction.jsx` – Create a new transaction (real world scenario with metamask on sepolia testnet).

Frontend communicates with the backend API through `src/api/blockchain.api.js`.



## API Endpoints

### GET `/api/transactions`

**Query Parameters (optional):**

* `fromAddress`
* `toAddress`
* `minAmount`
* `maxAmount`
* `startDate`
* `endDate`
* `status` (`pending` | `confirmed` | `cancelled`)

**Response:**

```json
{
  "success": true,
  "message": "transactions fetched successfully",
  "data": [ ...transactions ]
}
```



### POST `/api/transactions`

**Body Parameters (JSON):**

```json
{
  "blockId": 1,
  "fromAddress": "Alice",
  "toAddress": "Bob",
  "minAmount": 10,
  "maxAmount": 100,
  "startDate": "2026-01-01",
  "endDate": "2026-12-31",
  "Status": "PENDING"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Transaction created",
  "data": { ...transaction }
}
```



### DELETE `/api/transactions`

**Response:**

```json
{
  "success": true,
  "message": "Blockchain cleared successfully",
  "data": []
}
```



## Data Persistence

* Blockchain state is saved automatically to `blockchain.json`.
* Loading occurs on server startup.
* Clearing deletes `blockchain.json` and resets the blockchain.



## Transaction Status

| Status Key  | Stored Value | Frontend Value |
| ----------- | ------------ | -------------- |
| `pending`   | `PENDING`    | Pending        |
| `success`   | `CONFIRMED`  | Confirmed      |
| `cancelled` | `CANCELLED`  | Cancelled      |

> Make sure frontend status selection matches backend keys to properly filter.

## In-depth architecture

```mermaid
flowchart TD

    %% Entry Point
    A[React Frontend Interface] -->|HTTP Request| B[Server Infrastructure]

    %% API Routing
    subgraph API_Layer [API Layer]
        B --> C1[GET /transactions]
        B --> C2[POST /transactions]
    end

    %% Read Operations
    subgraph Read_Process [Read Logic]
        C1 --> D1[getTransactions]
        D1 --> E1[Load JSON Storage]
        E1 --> F1[Rehydrate Blocks]
        F1 --> G1[Rehydrate Transactions]
        G1 --> H1[Apply Filters]
        H1 --> I1[Return Response]
    end

    %% Write Operations
    subgraph Write_Process [Write Logic]
        C2 --> D2[createTransaction]
        D2 --> E2[Load JSON Storage]
        E2 --> F2[Find or Create Block]
        F2 --> G2[Create Transaction]
        G2 --> H2[Add to Block]
        H2 --> I2[Save JSON Storage]
    end

    %% Data Model
    subgraph Blockchain_Model [Data Hierarchy]
        X[Blockchain] --> Y[Block]
        Y --> Z[Transaction]
    end

    %% Logical Links
    G1 -.-> Z
    G2 -.-> Z

    
## How It Works

### createTransaction

1. Load blockchain from JSON  
2. Find or create block  
3. Create transaction  
4. Add transaction to block  
5. Save blockchain to disk  


### getTransactions

1. Load blockchain from JSON  
2. Rehydrate objects (Block + Transaction instances)  
3. Apply filters:
   - address  
   - amount  
   - date  
   - status  
4. Return filtered results  


## Core Structure

### Blockchain
→ contains **Blocks**

### Block
→ contains **Transactions**

### Transaction
Includes:
- addresses  
- amounts  
- dates  
- status  
- txHash  



## Persistence

- `load()` → used in **GET** and **POST**  
- `save()` → used in **POST**  
- `clear()` → used in **DELETE**  

---

## License

© 2026 rocker_bell. All rights reserved.

This project and its source code are proprietary.

Only the owner (rocker_bell) or explicitly designated parties may use, copy, modify, merge, publish, distribute, sublicense, or sell any part of this project.

Any unauthorized use, reproduction, modification, or distribution by others is strictly prohibited.

Note
->This project and repository are actively maintained and regularly updated.


