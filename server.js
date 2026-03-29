import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './Backend/routes/transactions.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ⚡ Mount router properly
app.use('/api/transactions', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});