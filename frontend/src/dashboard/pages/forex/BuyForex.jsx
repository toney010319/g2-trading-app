import { useState, useEffect } from "react";
import {
  getForexList,
  buyForex,
} from "../../../lib/api";
import ForexTransactions from "./ForexTransactions";
import Loading from "../../../components/Loading";
import ForexMiniPortfolio from "./ForexMiniPortfolio";
import { getImageLinkForex } from "../../../assets/Icons";

const BuyForex = ({ setUpdateBalanceFlag, addAlert }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [forexList, setForexList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrencyName, setSelectedCurrencyName] = useState("")
  const [loading, setLoading] = useState(true);
  const [updateTransactionHistory, setUpdateTransactionHistory] = useState(false);

  const handleDropdownChange = (e) => {
    const selectedSymbol = e.target.value;
    const selectedCurrency = forexList.find(
      (stock) => stock.symbol === selectedSymbol
    );
    setSymbol(selectedCurrency.symbol);
    setPrice(selectedCurrency.price);
    setSelectedCurrencyName(selectedCurrency.name)
    localStorage.removeItem("selectedForexSymbol");
    localStorage.removeItem("selectedForexName");
    localStorage.removeItem("selectedForexPrice");
  };

  const handleBuyCrypto = async () => {
    try {
      const adjustedPrice = price;
      const res = await buyForex(
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
      console.error("Error purchasing currency:", error);
    }
  };

  const calculateTotalAmount = () => {
    return (price * quantity).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getForexList();
        setLoading(false);
        setForexList(apiData);
        const storedSymbol = localStorage.getItem("selectedForexSymbol");
        const storedPrice = localStorage.getItem("selectedForexPrice");
        const storedName = localStorage.getItem("selectedForexName");

        if (storedSymbol || storedPrice) {
          setSymbol(storedSymbol);
          setPrice(storedPrice);
          setSelectedCurrencyName(storedName);

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
                Select Currency:
              </label>
              <select
                value={symbol}
                onChange={handleDropdownChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Choose a currency
                </option>
                {forexList.map((currency) => (
                  <option key={currency.symbol} value={currency.symbol}>
                    {currency.name}
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
                  <img className="w-8 mr-3" src={getImageLinkForex(symbol)} alt={symbol} />
                  <div className="mt-1 font-bold font-serif text-lg">{selectedCurrencyName}</div>
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
                    <div className="text-white bg-gray-950 rounded-md flex justify-center mb-2 font-semibold text-lg ease-in-out duration-300">
                      TOTAL: <span className="ml-2 font-bold animate-pulse">${calculateTotalAmount()}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center mb-2 font-semibold text-lg h-48">Choose currency</div>
            )}

            <button
              className="text-white px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-700 mb-2"
              onClick={handleBuyCrypto}
            >
              Buy
            </button>
          </div>
        )}
        <div className="flex">
          <ForexTransactions updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} />
        </div>

        <div className="flex">
          <ForexMiniPortfolio updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} setUpdateBalanceFlag={setUpdateBalanceFlag} />
        </div>
      </div>
    </>
  );
};

export default BuyForex;
