import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { createTransaction } from "../api/blockchain.api.js";
import "../Styles/BlockchainTransaction.css"
const SendTransaction = () => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);

  // ✅ CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const net = await provider.getNetwork();
      const bal = await provider.getBalance(address);

      setAccount(address);
      setNetwork(net);
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      setError(err.message);
    }
  };

  //  DISCONNECT (UI only)
  const disconnectWallet = () => {
    setAccount(null);
    setNetwork(null);
    setBalance(null);
  };

  //  AUTO UPDATE (accounts + network changes)
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      connectWallet(); //  refresh everything
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

const handleSend = async () => {
  try {
    setError(null);

    if (!account) throw new Error("Connect wallet first");
    if (!amount || Number(amount) <= 0) throw new Error("Enter a valid amount");
    if (!ethers.isAddress(toAddress)) throw new Error("Invalid recipient address");

    setLoading(true);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fromAddress = await signer.getAddress();

    //  Send transaction
    const txResponse = await signer.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount),
    });

    setTxHash(txResponse.hash);
    console.log("Tx sent:", txResponse.hash);

    // wait for confirmation and get the block number
    // wait for confirmation
const receipt = await txResponse.wait(); 
console.log("Confirmed:", receipt);

// get the block number the transaction was included in
const blockId = receipt.blockNumber;


const startDate= Date.now(); // current timestamp in milliseconds
const endDate= Date.now();

// send to backend including blockId
    await createTransaction({
  blockId,         
  fromAddress,
  toAddress,
  minAmount: Number(amount),
  maxAmount: Number(amount),
  startDate: Number(startDate), 
    endDate: Number(endDate),
  Status: "CONFIRMED",
  txHash: txResponse.hash
});

    //  refresh balance after tx
    const newBalance = await provider.getBalance(fromAddress);
    setBalance(ethers.formatEther(newBalance));

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
        <div className="send-eth-card">
            <div className="card-header">
                <div className="header-title-row">
                     <h2><i className="icon-wallet"></i> Send ETH</h2>
                     {account && <span className="status-badge">Connected</span>}
                </div>
                <p>Transfer Ethereum to any address</p>
            </div>

            <div className="card-content">
                {/* Connection Banner */}
                {account && (
                    <div className="connection-info success">
                        Connected: {account.slice(0, 10)}...{account.slice(-8)}
                    </div>
                )}

                {!account ? (
                    <button className="btn-primary full-width" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                ) : (
                    <div className="form-container">
                        <div className="input-group">
                            <label>Recipient Address</label>
                            <input
                                type="text"
                                placeholder="0x..."
                                value={toAddress}
                                onChange={(e) => setToAddress(e.target.value.trim())}
                            />
                        </div>

                        <div className="input-group">
                            <label>Amount in ETH</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        {network?.chainId !== 11155111n && (
                            <button className="btn-secondary full-width" onClick={() => 
                                window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] })
                            }>
                                Switch to Sepolia
                            </button>
                        )}

                        <button 
                            className="btn-success full-width" 
                            onClick={handleSend} 
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Send Transaction"}
                        </button>
                    </div>
                )}
            </div>
            
            {error && <p className="error-text">{error}</p>}
        </div>
    );

};

export default SendTransaction;