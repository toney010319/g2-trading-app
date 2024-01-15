import { useState, useEffect } from "react";
import {
  getForexList,
  buyForex,
} from "../../../lib/api";
import ForexTransactions from "./ForexTransactions";
import Loading from "../../../components/Loading";
import ForexMiniPortfolio from "./ForexMiniPortfolio";

const BuyForex = ({ setUpdateBalanceFlag }) => {
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
      const { success, message } = await buyForex(
        user_id,
        quantity,
        adjustedPrice,
        symbol
      );
      if (success) {
        setQuantity("");
        setPrice("");
        setSymbol("");
        setUpdateTransactionHistory(true);
        setUpdateBalanceFlag(true)
      } else {
        console.error("Error purchasing currency:", message);
      }
      } catch (error) {
        console.error("Error purchasing currency:", error);
      }
  };

  const calculateTotalAmount = () => {
    return (price * quantity).toFixed(2);
  };

  const getImageLink = (symbol) => {
    switch (symbol) {
      case 'PHP':
        return 'https://flagicons.lipis.dev/flags/4x3/ph.svg';
      case 'EUR':
        return 'https://flagicons.lipis.dev/flags/4x3/eu.svg';
      case 'JPY':
        return 'https://flagicons.lipis.dev/flags/4x3/jp.svg';
      case 'GBP':
        return 'https://flagicons.lipis.dev/flags/4x3/gb.svg';
      case 'AUD':
        return 'https://flagicons.lipis.dev/flags/4x3/au.svg'; 
      case 'CAD':
        return 'https://flagicons.lipis.dev/flags/4x3/ca.svg';   
      case 'CHF':
        return 'https://flagicons.lipis.dev/flags/4x3/ch.svg';  
      case 'CNY':
        return 'https://flagicons.lipis.dev/flags/4x3/cn.svg'; 
      case 'SEK':
        return 'https://flagicons.lipis.dev/flags/4x3/se.svg'; 
      case 'MXN':
        return 'https://flagicons.lipis.dev/flags/4x3/mx.svg';  
      case 'NZD':
        return 'https://flagicons.lipis.dev/flags/4x3/nz.svg';  
      case 'SGD':
        return 'https://flagicons.lipis.dev/flags/4x3/sg.svg';  
      case 'HKD':
        return 'https://flagicons.lipis.dev/flags/4x3/hk.svg';  
      case 'NOK':
        return 'https://flagicons.lipis.dev/flags/4x3/no.svg';  
      case 'KRW':
        return 'https://flagicons.lipis.dev/flags/4x3/kr.svg';  
      case 'TRY':
        return 'https://flagicons.lipis.dev/flags/4x3/tr.svg'; 
      case 'INR':
        return 'https://flagicons.lipis.dev/flags/4x3/in.svg';  
      case 'RUB':
        return 'https://flagicons.lipis.dev/flags/4x3/ru.svg';  
      case 'BRL':
        return 'https://flagicons.lipis.dev/flags/4x3/br.svg';  
      case 'ZAR':
        return 'https://flagicons.lipis.dev/flags/4x3/za.svg';  
      case 'DKK':
        return 'https://flagicons.lipis.dev/flags/4x3/dk.svg';  
      case 'TWD':
        return 'https://flagicons.lipis.dev/flags/4x3/tw.svg';  
      case 'PLN':
      return 'https://flagicons.lipis.dev/flags/4x3/pl.svg';  
      case 'THB':
        return 'https://flagicons.lipis.dev/flags/4x3/th.svg';  
      case 'MYR':
      return 'https://flagicons.lipis.dev/flags/4x3/my.svg';    
      }
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
        console.log('1st symbol:', storedSymbol, '1st price:', storedPrice);
        if (storedSymbol || storedPrice) {
          setSymbol(storedSymbol);
          setPrice(storedPrice);
          setSelectedCurrencyName(storedName);
          console.log('symbol:', storedSymbol, 'price:', storedPrice);
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
            <Loading  /> 
          </div>
        </div>
        ) : (
          <div className="mt-1 rounded-lg p-3 flex flex-col bg-gradient-to-b from-azure-950 to-azure-600">
            <div className="mb-4">
              <label className="text-white ml-1 block text-lg font-bold">
                Select Crypto:
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
                  <img className="w-8 mr-3" src={getImageLink(symbol)} alt={symbol} />
                  <div className="mt-1 font-bold font-serif text-lg">{selectedCurrencyName}</div>
                </div>
                <div className="flex-1 flex-col justify-center ease-in-out duration-300">
                {price !== null && !isNaN(parseFloat(price)) && (
                    <div className="text-white bg-azure-950 rounded-md flex justify-center mb-2 font-semibold text-lg">
                      PRICE: <span className="ml-2 font-bold">${parseFloat(price).toFixed(2)}</span>
                    </div>
                  )}

                  {symbol && (
                    <div className="text-white bg-azure-950 rounded-md flex justify-center mb-2 font-semibold text-lg ease-in-out duration-300">
                      SYMBOL: <span className="ml-2 font-bold">{symbol}</span>
                    </div>
                  )}

                  {quantity !== null && !isNaN(parseFloat(quantity)) && (
                    <div className="text-white bg-azure-950 rounded-md flex justify-center mb-2 font-semibold text-lg ease-in-out duration-300">
                      TOTAL: <span className="ml-2 font-bold animate-pulse">${calculateTotalAmount()}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center mb-2 font-semibold text-lg h-48">Choose currency</div>
            )}

            <button
              className="text-white px-4 py-2 bg-azure-500 rounded-md hover:bg-azure-700 mb-2"
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
