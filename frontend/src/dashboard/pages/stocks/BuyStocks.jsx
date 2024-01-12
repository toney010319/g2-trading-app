import { useState, useMemo, useEffect } from "react";
import {
  addStockBalance,
  revertStockBalance,
  getUserBalance,
  getStockList,
  buyStocks,
} from "../../../lib/api";
import Logo from "../../../assets/Logo";
import BuyStocksMarket from "./subcomponents/BuyStocksMarket";
import TransferStocks from "./TransferStocks";

const BuyStocksLayout = () => {
  const [transferAmount, setTransferAmount] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [balance, setBalance] = useState("");
  const user_id = document.cookie.split("user_id=")[1];
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [stockList, setStockList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const usdAmount = stockAmount * 56.17;

  const fetchUserBalance = useMemo(
    () => async () => {
      try {
        const response = await getUserBalance(user_id);
        setBalance(response);
        console.log(response, "set balance response");
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    [user_id]
  );


  const handleDropdownChange = (e) => {
    const selectedSymbol = e.target.value;
    const selectedStock = stockList.find(
      (stock) => stock.symbol === selectedSymbol
    );
    setSymbol(selectedStock.symbol);
    setPrice(selectedStock.price);
    localStorage.removeItem("selectedStockSymbol");
    localStorage.removeItem("selectedStockName");
  };

  const handleBuyStocks = async () => {
    try {
      const adjustedPrice = price * 56.17;

      const { success, message } = await buyStocks(
        user_id,
        quantity,
        adjustedPrice,
        symbol
      );
      if (success) {
        console.log("Stock purchased successfully:", message);
        fetchUserBalance();
        setQuantity("");
        setStockAmount("");
        setPrice("Select a stock");
        setSymbol("Select a stock");
      } else {
        console.error("Error purchasing stocks:", message);
      }
    } catch (error) {
      console.error("Error purchasing stocks:", error);
    }
  };

  const handleSellStocks = async () => {
    try {
      console.log(
        "stock amount:",
        quantity,
        "price:",
        price,
        "symbol:",
        symbol
      );
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchUserBalance();

    const storedSymbol = localStorage.getItem("selectedStockSymbol");
    const storedPrice = localStorage.getItem("selectedStockPrice");

    if (storedSymbol && storedPrice) {
      setSymbol(storedSymbol);
      setPrice(storedPrice);
    }
  }, [user_id, fetchUserBalance]);

  return (
    <>
        <div className="flex flex-col bg-indigo-200">
          <div className="mb-4">
            <label className="block text-sm font-semibold">
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
            <label className="block text-sm font-semibold">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">AMOUNT: ${price}</div>
          <div className="mb-2">COMPANY: {symbol}</div>
          <div className="mb-2">TOTAL AMOUNT: ${calculateTotalAmount()}</div>
          <button
            className="text-white px-4 py-2 bg-azure-500 rounded-md hover:bg-azure-700 mb-2"
            onClick={handleBuyStocks}
          >
            Buy Shares
          </button>
          <button
            className="text-white px-4 py-2 bg-azure-500 rounded-md hover:bg-azure-700"
            onClick={handleSellStocks}
          >
            Sell Shares
          </button>
        </div>
        <div id="table">
          <section className="container mx-auto p-2 font-mono">
            <div>
              <div className="flex justify-center">
                <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
                  <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGR5emRjODQ0bDhsaXNpbzR0ODBqazNhMGVmaDRzZHBkd2dyM3FhZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aCPUvrFE4M6j8l2/giphy.gif"
                    alt="stock market"
                    className="w-8"
                  />
                  Recent Transactions
                </span>
              </div>
            </div>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Symbol</th>
                      <th className="px-4 py-3">Price ($)</th>
                      <th className="px-4 py-3">Highest Price Today</th>
                      <th className="px-4 py-3">Lowest Price Today</th>
                      <th className="px-4 py-3">Market Cap</th>
                      <th className="px-4 py-3">Average Volume</th>
                      <th className="px-4 py-3">Percentage +/-</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center w-full h-10">
                          {/* <Loading /> */}
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-2 py-2 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <div className="flex font-semibold text-black">
                              <span>
                                <img className="rounded-full w-5" />
                              </span>
                              <span className="ml-1">0</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms text-center font-semibold border">
                        1
                      </td>
                      <td className="px-4 py-3 text-ms text-center font-semibold border">
                        2
                      </td>
                      <td className="px-4 py-3 text-xs text-center border">
                        3
                      </td>
                      <td className="px-4 py-3 text-xs text-center border">
                        4
                      </td>
                      <td className="px-4 py-3 text-xs text-center border">
                        5
                      </td>
                      <td className="px-4 py-3 text-xs text-center border">
                        6
                      </td>
                      <td className="px-4 py-3 text-ms text-center font-semibold border">
                        7
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

export default BuyStocksLayout;
