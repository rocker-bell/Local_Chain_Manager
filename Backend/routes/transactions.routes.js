// model 1
// import express from 'express';
// import { blockchain } from '../models/blockchain.js';

// const router = express.Router();

// router.get('/', (req, res) => {
//     try {
//         const filters = req.query;
//         const data = blockchain.getTransactions(filters);
//         res.json({ success: true, data });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });

// router.post('/', (req, res) => {
//     try {
//         const { blockId, ...txData } = req.body;
//         if (!blockId) throw new Error('blockId required');
//         const tx = blockchain.createTransaction(Number(blockId), txData);
//         res.status(201).json({ success: true, data: tx });
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// });

// export default router;

// // model2

import express from 'express';
import { getTransactions, createTransaction} from '../controllers/transactions.controller.js';

const router = express.Router();

router.get('/', getTransactions);        // GET /api/transactions
router.post('/', createTransaction);     // POST /api/transactions
// router.delete('/', clearBlockchain);     // DELETE /api/transactions

export default router;