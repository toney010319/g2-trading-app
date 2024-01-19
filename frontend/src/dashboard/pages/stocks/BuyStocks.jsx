import { useState, useEffect } from "react";
import {
  getStockList,
  buyStocks,
} from "../../../lib/api";
import StocksTransactions from "./StocksTransactions";
import Loading from "../../../components/Loading";
import StocksMiniPortfolio from "./StocksMiniPortfolio";
import { getImageLinkStocks } from "../../../assets/Icons";

const BuyStocks = ({ setUpdateBalanceFlag, addAlert }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [stockList, setStockList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedStockName, setSelectedStockName] = useState("")
  const [loading, setLoading] = useState(true);
  const [updateTransactionHistory, setUpdateTransactionHistory] = useState(false);

  const handleDropdownChange = (e) => {
    const selectedSymbol = e.target.value;
    const selectedStock = stockList.find(
      (stock) => stock.symbol === selectedSymbol
    );
    setSymbol(selectedStock.symbol);
    setPrice(selectedStock.price);
    setSelectedStockName(selectedStock.name)
    localStorage.removeItem("selectedStockSymbol");
    localStorage.removeItem("selectedStockName");
    localStorage.removeItem("selectedStockPrice");
  };

  const handleBuyStocks = async () => {
    try {
      const adjustedPrice = price;

      const res = await buyStocks(
        user_id,
        quantity,
        adjustedPrice,
        symbol
      );

      if (res?.data?.success) {
        addAlert('success', `SUCCESSFULLY PURCHASED`)
        setQuantity("");
        setPrice("");
        setSymbol("");
        setUpdateTransactionHistory(true);
        setUpdateBalanceFlag(true)
      } else {
        addAlert('error', `${res.message}`)
        console.error("Error purchasing stocks:", res.message);
      }
    } catch (error) {
      console.error("Error purchasing stocks:", error);
    }
  };

  const calculateTotalAmount = () => {
    return (price * quantity).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getStockList();
        setLoading(false);
        setStockList(apiData);
        const storedSymbol = localStorage.getItem("selectedStockSymbol");
        const storedPrice = localStorage.getItem("selectedStockPrice");
        const storedName = localStorage.getItem("selectedStockName");

        if (storedSymbol || storedPrice) {
          setSymbol(storedSymbol);
          setPrice(storedPrice);
          setSelectedStockName(storedName);

        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="flex-1 flex justify-around">
        {loading ? (
          <div className="ml-12 w-96 mr-24">
            <div className="h-full my-auto mx-auto w-20">
              <Loading />
            </div>
          </div>
        ) : (
          <div className="mt-1 rounded-lg p-3 flex flex-col bg-gradient-to-b from-gray-950 to-gray-600 hover:ring-white-400 hover:border-4 hover:border-white-300 hover:scale-105 duration-300 ease-in-out">
            <div className="mb-4">
              <label className="text-white ml-1 block text-lg font-bold">
                Select a stock:
              </label>
              <select
                value={symbol}
                onChange={handleDropdownChange}
                className="w-full p-2 border border-gray-300 rounded-md"
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
            <div className="mb-4">
              <label className=" text-white font-semibold">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="text-center w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {price && symbol ? (
              <>
                <div className="bg-white flex justify-center rounded-md shadow-lg p-4 my-2 mx-4">
                  <img className="w-10 mr-3" src={getImageLinkStocks(symbol)} alt={symbol} />
                  <div className="mt-1 font-bold font-serif text-lg">{selectedStockName}</div>
                </div>
                <div className="flex-1 flex-col justify-center ease-in-out duration-300">
                  {price !== null && !isNaN(parseFloat(price)) && (
                    <div className="text-white bg-gray-950 rounded-md flex justify-center mb-2 font-semibold text-lg">
                      PRICE: <span className="ml-2 font-bold">${parseFloat(price).toFixed(2)}</span>
                    </div>
                  )}

                  {symbol && (
                    <div className="text-white bg-gray-950 rounded-md flex justify-center mb-2 font-semibold text-lg ease-in-out duration-300">
                      SYMBOL: <span className="ml-2 font-bold">{symbol}</span>
                    </div>
                  )}

                  {quantity !== null && !isNaN(parseFloat(quantity)) && (
                    <div className="text-white bg-gray-950 rounded-md flex justify-center font-semibold text-lg ease-in-out duration-300">
                      TOTAL: <span className="ml-2 font-bold animate-pulse">${calculateTotalAmount()}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center mb-2 font-semibold text-lg h-48">Choose a stock</div>
            )}

            <button
              className="text-white px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-700 mb-2"
              onClick={handleBuyStocks}
            >
              Buy Shares
            </button>
          </div>
        )}
        <div className="flex">
          <StocksTransactions updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} />
        </div>

        <div className="flex">
          <StocksMiniPortfolio updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} setUpdateBalanceFlag={setUpdateBalanceFlag} addAlert={addAlert} />
        </div>
      </div>
    </>
  );
};

export default BuyStocks;
