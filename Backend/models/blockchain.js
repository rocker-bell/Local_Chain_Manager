

class Transaction {
    construcor(id, fromAddress, toAddress, minAmount, maxAmount, startDate, endDate, status) {
        this.id = id;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        txHash = null


        this.status = status;
        this.txHash = this.txHash
    }

}


class Block {
    constructor(id) {
        this.id = id;
        this.transaction = []
    }

    addTransaction(tx) {
        this.transactions.push(tx);
    }
}


