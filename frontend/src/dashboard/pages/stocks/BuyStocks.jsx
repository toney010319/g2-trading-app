import { useState, useMemo, useEffect } from "react";
import { addStockBalance, revertStockBalance, getUserBalance, getStockList, buyStocks } from "../../../lib/api";
import Logo from "../../../assets/Logo";
import BuyStocksMarket from "./subcomponents/BuyStocksMarket";

const BuyStocks = () => {
  const [transferAmount, setTransferAmount] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [balance, setBalance] = useState("");
  const user_id = document.cookie.split("user_id=")[1];
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [stockList, setStockList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const usdAmount = stockAmount * 56.17

  const fetchUserBalance = useMemo(() => async () => {
    try {
      const response = await getUserBalance(user_id);
      setBalance(response);
      console.log(response, 'set balance response')
  
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [user_id]);

  const handleTransferToStock = async () => {
    try {
      const { addBalanceResponse } = await addStockBalance(
        transferAmount,
        user_id
      );
      console.log("Transfer from wallet to stock successful:", addBalanceResponse);
      fetchUserBalance()
      setTransferAmount("")
    } catch (error) {
      console.error("Error transferring from wallet to stock:", error);
    }
  };



  const handleTransferToWallet = async () => {
    try {
      const { revertBalanceResponse } = await revertStockBalance(
        usdAmount,
        user_id
      );
      console.log("Transfer from stock to wallet successful:", revertBalanceResponse)
      fetchUserBalance()
      setStockAmount("")
    } catch (error) {
      console.error("Error transferring from stock to wallet:", error);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedSymbol = e.target.value;
    const selectedStock = stockList.find(stock => stock.symbol === selectedSymbol);
    setSymbol(selectedStock.symbol);
    setPrice(selectedStock.price);
    localStorage.removeItem('selectedStockSymbol');
    localStorage.removeItem('selectedStockName');
  };

  const handleBuyStocks = async () => {
    try {
      const adjustedPrice = price * 56.17;
  
      const { success, message } = await buyStocks(user_id, quantity, adjustedPrice, symbol);
      if (success) {
        console.log("Stock purchased successfully:", message);
        fetchUserBalance();
      } else {
        console.error("Error purchasing stocks:", message);
      }
    } catch (error) {
      console.error("Error purchasing stocks:", error);
    }
  };

  const handleSellStocks = async () => {
    try {
      console.log('stock amount:', quantity, 'price:', price,'symbol:', symbol)
    } catch (error) {
      console.error("Error selling stocks:", error);
    }
  };

  
const calculateTotalAmount = () => {
  return (price * quantity).toFixed(2);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getStockList();
        setStockList(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchUserBalance();
    
    const storedSymbol = localStorage.getItem('selectedStockSymbol');
    const storedPrice = localStorage.getItem('selectedStockPrice');

    if (storedSymbol && storedPrice) {
      setSymbol(storedSymbol);
      setPrice(storedPrice);
    }
  }, [user_id, fetchUserBalance]);


  return (
    <>
      <div className="flex justify-around mt-3 bg-red-200 h-96">
        <div className="bg-yellow-200 rounded-lg ml-4">
          <div className="mt-4">
            <Logo />
          </div>
            <div className="flex flex-col">
              <div className="flex bg-green-200 rounded-lg m-3 pb-3">
                <div className="flex-1">
                  <div className="flex justify-center font-sans font-bold text-lg">Your PHP Wallet</div>
                  <div className="flex flex-col">
                    <span className="font-bold ml-1">Balance: </span>
                    <span className="flex font-bold justify-center text-3xl border-1 mt-4 border-black border-b-4">₱{parseFloat(balance.balance).toFixed(2)}</span>
                  </div>

                </div>
            </div>

              <div className="m-3 flex flex-col">
                <label className="text-center" htmlFor="transferAmount">Transfer Amount</label>
                <input
                  className="text-center"
                  type="text"
                  id="transferAmount"
                  placeholder="$ 0.00"
                  value={`$ ${(transferAmount * 0.01778584).toFixed(2)}`}
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
                <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2" onClick={handleTransferToStock}>Transfer</button>
              </div>
            </div>
        </div>
        
        <div className="bg-yellow-500 rounded-lg ml-5">
          <div className="mt-4">
            <Logo />
            </div>
              <div className="flex flex-col">
                <div className="flex bg-green-200 rounded-lg m-3 pb-3">
                  <div className="flex-1">
                    <div className="flex justify-center font-sans font-bold text-lg">USD Stock Wallet</div>
                    <div className="flex flex-col">
                      <span className="font-bold ml-1">Balance: </span>
                      <span className="flex font-bold justify-center text-3xl border-1 mt-4 border-black border-b-4">${(balance.stocks * 0.01778584).toFixed(2)}</span>
                    </div>

                  </div>
              </div>

                <div className="m-3 flex flex-col">
                  <label className="text-center" htmlFor="transferAmount">Transfer Amount</label>
                  
                  <input
                    className="text-center"
                    type="text"
                    id="transferAmount"
                    placeholder="$ 0.00"
                    value={`₱ ${stockAmount * 56.12}`}
                    onChange={(e) => setStockAmount(e.target.value)}
                    disabled
                  />
                  <input
                    className="text-center"
                    type="text"
                    id="transferAmount"
                    placeholder="$ 0.00"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                  />
                  <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2" onClick={handleTransferToWallet}>Transfer</button>
                </div>

                
            </div>
        </div>

        <div className="flex">
          <BuyStocksMarket />
        </div>
        

      </div>

      <div>
        TABLE BUY SELL HERE
        <div>
          <label>Select a stock:</label>
          <select
            value={symbol}
            onChange={handleDropdownChange}
            className="text-center font-semibold"
          >
            <option value="" disabled>
              Choose a Stock
            </option>
            {stockList.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="text-center"
          />
        </div>
        <div>
          AMOUNT: ${price}
        </div>
        <div>
          COMPANY: {symbol}
        </div>
        <div>
          TOTAL AMOUNT: ${calculateTotalAmount()}
        </div>
        <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2" onClick={handleBuyStocks}>
            Buy Stocks
          </button>
          <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700 mt-2" onClick={handleSellStocks}>
            Sell Stocks
        </button>
      </div>
    </>
  );
};

export default BuyStocks;
