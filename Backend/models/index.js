// models/index.js
import { Blockchain, Block, Transaction, STATUS } from './blockchain.js';
import { persistenceService } from '../services/persistence.service.js';

// Create blockchain instance
export const blockchain = new Blockchain();

// Try to restore saved state from disk
const saved = persistenceService.load();

if (saved && saved.chain && saved.chain.length > 0) {
  // Rehydrate blocks and transactions
  saved.chain.forEach(blockData => {
    const block = new Block(blockData.id);
    blockData.transactions.forEach(txData => {
      const tx = new Transaction(
        txData.id,
        txData.fromAddress,
        txData.toAddress,
        txData.minAmount,
        txData.maxAmount,
        txData.startDate,
        txData.endDate,
        txData.Status
      );
      block.addTransaction(tx);
    });
    blockchain.addBlock(block);
  });
  console.log(`[Startup] ✅ Blockchain restored from saved state with ${blockchain.chain.length} block(s).`);
} else {
  // No saved state → seed demo data
  const tx1 = new Transaction(
    1,
    'Alice',
    'Bob',
    10,
    100,
    Date.now(),
    Date.now() + 3600 * 1000, // ends in 1 hour
    STATUS.CONFIRMED
  );
  const block1 = new Block(1);
  block1.addTransaction(tx1);
  blockchain.addBlock(block1);

  // Persist initial demo data
  persistenceService.save(blockchain);

  console.log('[Startup] ⚠️ No saved state found — demo blockchain seeded.');
}