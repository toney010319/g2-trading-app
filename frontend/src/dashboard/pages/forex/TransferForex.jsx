import { useState, useMemo, useEffect } from "react";
import {
  addForexBalance,
  revertForexBalance,
  getUserBalance
} from "../../../lib/api";
import LogoDark from "../../../assets/LogoDark";

const TransferForex = ({ updateBalanceFlag, setUpdateBalanceFlag }) => {
  const [transferAmount, setTransferAmount] = useState("");
  const [forexAmount, setForexAmount] = useState("");
  const [balance, setBalance] = useState("");
  const user_id = document.cookie.split("user_id=")[1];
  const [loading, setLoading] = useState(true);
  const usdAmount = forexAmount;

  const fetchUserBalance = useMemo(
    () => async () => {
      try {
        const response = await getUserBalance(user_id);
        setBalance(response);
        console.log(response, "set balance response");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    },
    [user_id]
  );

  const handleTransferToForex = async () => {
    try {
      const { addBalanceResponse } = await addForexBalance(
        transferAmount,
        user_id
      );
      console.log(
        "Transfer from wallet to forex wallet successful:",
        addBalanceResponse
      );
      fetchUserBalance();
      setTransferAmount("");
    } catch (error) {
      console.error("Error transferring from wallet to forex wallet:", error);
    }
  };

  const handleTransferToWallet = async () => {
    try {
      const { revertBalanceResponse } = await revertForexBalance(
        usdAmount,
        user_id
      );
      console.log(
        "Transfer from forex to wallet successful:",
        revertBalanceResponse
      );
      fetchUserBalance();
    } catch (error) {
      console.error("Error transferring from forex to wallet:", error);
    }
  };
  

  useEffect(() => {
    fetchUserBalance();
    setUpdateBalanceFlag(false);
  }, [user_id, fetchUserBalance, updateBalanceFlag, setUpdateBalanceFlag]);

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="bg-gradient-to-b from-azure-950 to-azure-600 rounded-lg ml-4">
          <div className="mt-4">
            <LogoDark  />
          </div>
          <div className="flex flex-col">
            <div className="flex bg-azure-700 text-white rounded-lg m-3 pb-3">
              <div className="flex-1">
                <div className="flex mt-2 justify-center font-sans font-bold text-lg">
                  Your PHP Wallet
                </div>
                <div className="flex flex-col">
                  <span className="font-bold ml-1">Balance: </span>
                  <span className="flex text-white font-bold justify-center text-3xl border-1 mt-4 border-black border-b-4 rounded-sm bg-blue-900">
                    {loading ? <div className="text-center">Loading...</div> : `₱${parseFloat(balance.balance).toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="m-3 flex flex-col">
              <label className="text-center text-white font-semibold" htmlFor="transferAmount">
                Transfer Amount
              </label>
              <input
                className="text-center"
                type="text"
                id="transferAmount"
                placeholder="$ 0.00"
                value={`$ ${parseFloat(transferAmount * 0.01778584).toFixed(2)}`}
                onChange={(e) => setTransferAmount(e.target.value)}
                disabled
              />

              <input
                className="text-center"
                placeholder="₱ 0.00"
                type="text"
                id="transferAmount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button
                className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2"
                onClick={handleTransferToForex}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-azure-600 to-azure-950 rounded-lg ml-4">
          <div className="mt-4">
            <LogoDark  />
          </div>
          <div className="flex flex-col">
            <div className="flex bg-azure-900 text-white rounded-lg m-3 pb-3">
              <div className="flex-1">
                <div className="flex mt-2 justify-center font-sans font-bold text-lg">
                  Currency Wallet
                </div>
                <div className="flex flex-col">
                  <span className="font-bold ml-1">Balance: </span>
                  <span className="flex font-bold justify-center text-3xl border-1 mt-4 border-black border-b-4 bg-blue-700">
                  {loading ? <div className="text-center">Loading...</div> : `$${parseFloat(balance.forex).toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="m-3 flex flex-col">
              <label className="text-center text-white font-semibold" htmlFor="transferAmount">
                Transfer Amount
              </label>

              <input
                className="text-center"
                type="text"
                id="transferAmount"
                placeholder="$ 0.00"
                value={`₱ ${forexAmount * 56.12}`}
                onChange={(e) => setForexAmount(e.target.value)}
                disabled
              />
              <input
                className="text-center"
                type="text"
                id="transferAmount"
                placeholder="$ 0.00"
                value={forexAmount}
                onChange={(e) => setForexAmount(e.target.value)}
              />
              <button
                className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2"
                onClick={handleTransferToWallet}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferForex;
