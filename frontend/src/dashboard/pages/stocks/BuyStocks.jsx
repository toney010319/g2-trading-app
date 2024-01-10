import React, { useState } from 'react';

const BuyStocks = () => {
  const [walletBalance, setWalletBalance] = useState(); 
  const [stockBalance, setStockBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [stockValue, setStockValue] = useState('');

  const handleTransferToStock = () => {
    console.log('Transfer from wallet to stock:', transferAmount, selectedStock);
  };

  const handleTransferToWallet = () => {
    console.log('Transfer from stock to wallet:', transferAmount, selectedStock);
  };


  const stockOptions = ['Stock A', 'Stock B', 'Stock C'];

  return (
    <>
      <div className="flex-1 flex-row bg-red-200">
        <div className="bg-yellow-200">
          <div className="bg-green-200 rounded-md m-3">
            <div>Your Wallet</div>
            <div>Balance: ${walletBalance}</div>
          </div>
          <div className="m-3">
            <label htmlFor="transferAmount">Transfer Amount:</label>
            <input
              type="text"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <br />
            <button onClick={handleTransferToStock}>Transfer to Stock</button>
          </div>
        </div>

        <div className="bg-blue-200 rounded-md">
          <div className="bg-green-200 rounded-md m-3">
            <div>Your Stock Wallet</div>
            <div>Balance: ${stockBalance}</div>
          </div>
          <div className="m-3">
            <label htmlFor="transferAmount">Transfer Amount:</label>
            <input
              type="text"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <br />
            <label htmlFor="selectedStock">Select Stock:</label>
            <select
              id="selectedStock"
              value={selectedStock}
              onChange={(e) => {
                setSelectedStock(e.target.value);
              }}
            >
              <option value="">Choose a stock</option>
              {stockOptions.map((stock) => (
                <option key={stock} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="stockValue">Stock Value:</label>
            <div>{stockValue}</div>
            <br />
            <button onClick={handleTransferToWallet}>Transfer to Wallet</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyStocks;