import { blockchain } from "./Backend/models/blockchain.js";
const newTx = blockchain.createTransaction(1, {
  fromAddress: "Charlie",
  toAddress: "Dave",
  minAmount: 20,
  maxAmount: 200,
  startDate: "2026-01-01",
  endDate: "2026-12-31",
  Status: "PENDING"
});

console.log("newTx added", newTx)