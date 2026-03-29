export const fetchTransactions = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/transactions?${query}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
};

export const createTransaction = async (txData) => {
    const res =  await fetch('/api/transactions', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(txData),
    });

    if(!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }
}