import React, { useState } from "react";
import { addStockBalance, revertStockBalance } from "../../../lib/api";

const BuyStocks = () => {
  const [transferAmount, setTransferAmount] = useState("");
  const user_id = document.cookie.split("user_id=")[1];

  const handleTransferToStock = async () => {
    try {
      const { addBalanceResponse } = await addStockBalance(
        transferAmount,
        user_id
      );
      console.log(
        "Transfer from wallet to stock successful:",
        addBalanceResponse
      );
    } catch (error) {
      console.error("Error transferring from wallet to stock:", error);
    }
  };

  const handleTransferToWallet = async () => {
    try {
      const { revertBalanceResponse } = await revertStockBalance(
        transferAmount,
        user_id
      );
      console.log(
        "Transfer from stock to wallet successful:",
        revertBalanceResponse
      );
    } catch (error) {
      console.error("Error transferring from stock to wallet:", error);
    }
  };

  return (
    <>
      <div className="flex-1 flex-row bg-red-200">
        <div className="bg-yellow-200">
          <div className="bg-green-200 rounded-md m-3">
            <div>Your Wallet</div>
            <div>Balance: </div>
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
            <div>Balance: </div>
          </div>
          <div className="m-3">
            <label htmlFor="transferAmount">Transfer Amount:</label>
            <input
              type="text"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <button onClick={handleTransferToWallet}>Transfer to Wallet</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyStocks;
