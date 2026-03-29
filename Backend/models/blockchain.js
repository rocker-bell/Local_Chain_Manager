

const STATUS = {
    pending: "PENDING",
    success: "CONFIRMED",
    cancelled: "CANCELLED"
}

class Transaction {
    constructor(id, fromAddress, toAddress, minAmount, maxAmount, startDate, endDate, status = STATUS.pending , txHash = null) {
        this.id = id;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        
        this.status = status;
        this.txHash = txHash
    }

}


class Block {
    constructor(id) {
        this.id = id;
        this.transactions = []
    }

    addTransaction(tx) {
        this.transactions.push(tx);
    }
}


class BlockChain {
    constructor() {
        this.chain = [];
    }

    addBlock(block) {
        this.chain.push(block);


    }

    addTransactionToBlock(blockId, tx) {
        const block = this.chain.find(b => b.id === blockId);
        if(!block) {
            throw new Error("Block not found");
        }

        block.addTransaction(tx);
    }

    getTransactions(filters = {}) {
        const {fromAddress, toAddress, minAmount, maxAmount, startDate, endDate, status} = filters;

        return this.chain.map(block => block.transactions.filter(tx => {
            if (fromAddress && tx.fromAddress !== fromAddress) return false;
            if (toAddress && tx.toAddress !== toAddress) return false;

            if(minAmount && tx.maxAmount < Number(minAmount)) return false;
if(maxAmount && tx.minAmount > Number(maxAmount)) return false;

            // if(minAmount && tx.maxAmount < Number(minAmount)) return false;
            // if(maxAmount && tx.minAmount > Number(maxAmount)) return false;

            // if(startDate && tx.startDate < Number(startDate)) return false;
            // if(endDate && tx.endDate > Number(endDate)) return false;
            if (startDate && new Date(tx.startDate) < new Date(startDate)) return false
            if (endDate && new Date(tx.endDate) > new Date(endDate)) return false;

            if (status && tx.status !== STATUS[status]) return false;

            return true;
        })
    ).flat();
    }

    createTransaction(blockId, txData) {
        const tx = new Transaction(
            Date.now(),
            txData.fromAddress,
            txData.toAddress,
            txData.minAmount,
            txData.maxAmount,
            txData.startDate,
            txData.endDate,
            txData.status,
            txData.txHash
        )

        this.addTransactionToBlock(blockId, tx);
        return tx;
    }
}

const blockchain = new BlockChain();
const block1 = new Block(1);

const tx1 = new Transaction(
    1,
    "Alice",
    "Bob",
    10,
    100,
    "2026-03-29",
    "2026-04-01",
    STATUS.pending
);

block1.addTransaction(tx1);
blockchain.addBlock(block1);

export {BlockChain, blockchain, Block, Transaction, STATUS};