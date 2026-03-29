import express from 'express';
import {blockchain} from '../blockchain.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const data = blockchain.getTransactions(req,query);
        res.json(data);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', (req,res) => {
    try {
        const { blockId, ...txData} = req.body;

        const tx = blockchain.createTransaction(Number(blockId), txData);

        res.status(201).json(tx);
    }

    catch(err) {
        res.status(400).json({error: err.message})
    }
})