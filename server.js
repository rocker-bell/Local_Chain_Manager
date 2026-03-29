import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { blockchain } from './Backend/models/index.js';
import router from './Backend/routes/transactions.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ⚡ Mount router properly
app.use('/api/transactions', router);


app.post('/', (req, res) => {
  try {
    const tx = blockchain.createTransaction(1, {
      ...req.body,
      Status: req.body.Status || "pending",
    });

    res.json({
      success: true,
      data: tx,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});