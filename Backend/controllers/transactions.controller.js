import { blockchain } from '../models/blockchain.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getTransactions = (req , res) => {
    const filters = req.query;
    const transactions = blockchain.getTransactions(filters);
    return sendSuccess( res,  'transactions fetched successfully', transactions)
};

export const createTransaction = (req, res) => {
    try {
        const {blockId, ...txData} = req.body;
        const tx = blockchain.createTransaction(Number(blockId), txData);
        return sendSuccess( res, 'transaction created', tx )

    }
    catch(err) {
       return sendError( res, 'failed to create Transaction' )
    }
}