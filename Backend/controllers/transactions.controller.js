// model 1

// import { blockchain } from '../models/blockchain.js';
// import { sendSuccess, sendError } from '../utils/response.js';

// export const getTransactions = (req , res) => {
//     const filters = req.query;
//     const transactions = blockchain.getTransactions(filters);
//     return sendSuccess( res,  'transactions fetched successfully', transactions)
// };

// export const createTransaction = (req, res) => {
//     try {
//         const {blockId, ...txData} = req.body;
//         const tx = blockchain.createTransaction(Number(blockId), txData);
//         return sendSuccess( res, 'transaction created', tx )

//     }
//     catch(err) {
//        return sendError( res, 'failed to create Transaction' )
//     }
// }


// model 2
// backend/controllers/transactions.controller.js
import { persistenceService } from '../services/persistence.service.js';
import { Block, Transaction, STATUS } from '../models/blockchain.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getTransactions = (req, res) => {
  try {
    const filters = req.query || {};

    // 1️⃣ Load blockchain from disk
    const savedData = persistenceService.load();
    if (!savedData || !savedData.chain || savedData.chain.length === 0) {
      return sendSuccess(res, []); // empty blockchain
    }

    // 2️⃣ Rehydrate into Block + Transaction instances
    const blockchainChain = savedData.chain.map(b => {
      const block = new Block(b.id);
      block.transactions = b.transactions.map(tx => new Transaction(
        tx.id, tx.fromAddress, tx.toAddress, tx.minAmount, tx.maxAmount, tx.startDate, tx.endDate, tx.Status
      ));
      return block;
    });

    // 3️⃣ Normalize status filter
    if (filters.status && STATUS[filters.status]) {
      filters.status = STATUS[filters.status];
    }

    // 4️⃣ Apply filters
    const transactions = blockchainChain.flatMap(block =>
      block.transactions.filter(tx => {
        if (filters.fromAddress && tx.fromAddress !== filters.fromAddress) return false;
        if (filters.toAddress && tx.toAddress !== filters.toAddress) return false;
        if (filters.minAmount && tx.minAmount < Number(filters.minAmount)) return false;
        if (filters.maxAmount && tx.maxAmount > Number(filters.maxAmount)) return false;
        if (filters.startDate && new Date(tx.startDate) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(tx.endDate) > new Date(filters.endDate)) return false;
        if (filters.status && tx.Status !== filters.status) return false;
        return true;
      })
    );

    return sendSuccess(res, transactions);
  } catch (err) {
    console.error(err);
    return sendError(res, 'Failed to fetch transactions');
  }
};

export const createTransaction = (req, res) => {
  try {
    const { blockId, fromAddress, toAddress, minAmount, maxAmount, startDate, endDate, Status, network } = req.body;

    // 1️⃣ Load blockchain
    const savedData = persistenceService.load() || { chain: [] };

    // 2️⃣ Find block
    let blockData = savedData.chain.find(b => b.id === Number(blockId));

    // 3️⃣ If block not found, create it
    if (!blockData) {
      blockData = {
        id: Number(blockId),
        network: network || 'sepolia',
        transactions: [],
      };
      savedData.chain.push(blockData);
      console.log(`Created new block ${blockId} on network ${blockData.network}`);
    }

    // 4️⃣ Create transaction
    const tx = new Transaction(
      Date.now(),
      fromAddress,
      toAddress,
      minAmount,
      maxAmount,
      startDate,
      endDate,
      Status
    );

    blockData.transactions.push(tx);

    // 5️⃣ Save blockchain
    persistenceService.save(savedData);

    return sendSuccess(res, tx, 'Transaction created');
  } catch (err) {
    console.error(err);
    return sendError(res, 'Failed to create transaction');
  }
};

export const clearBlockchain = (req, res) => {
  try {
    persistenceService.clear();
    return sendSuccess(res, [], 'Blockchain cleared successfully');
  } catch (err) {
    console.error(err);
    return sendError(res, 'Failed to clear blockchain');
  }
};