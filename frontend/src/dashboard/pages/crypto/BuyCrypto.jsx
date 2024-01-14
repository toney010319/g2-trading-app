import { useState, useEffect } from "react";
import {
  getCryptoList,
  buyCrypto,
} from "../../../lib/api";
import CryptoTransactions from "./CryptoTransactions";
import Loading from "../../../components/Loading";
import CryptoMiniPortfolio from "./CryptoMiniPortfolio";

const BuyCrypto = ({ setUpdateBalanceFlag }) => {
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
    localStorage.removeItem("selectedCryptoSymbol");
    localStorage.removeItem("selectedCryptoName");
    localStorage.removeItem("selectedCryptoPrice");
  };

  const handleBuyCrypto = async () => {
    try {
      const adjustedPrice = price;
      const { success, message } = await buyCrypto(
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
        console.error("Error purchasing stocks:", message);
      }
      } catch (error) {
        console.error("Error purchasing stocks:", error);
      }
  };

  const calculateTotalAmount = () => {
    return (price * quantity).toFixed(2);
  };

  const getImageLink = (symbol) => {
    switch (symbol) {
      case 'BTC':
        return 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029';
      case 'ETH':
        return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029';
      case 'BNB':
        return 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029';
      case 'SOL':
        return 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029';
      case 'XRP':
        return 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029'; 
      case 'ADA':
        return 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029';   
      case 'AVAX':
        return 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029';  
      case 'DOGE':
        return 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029'; 
      case 'DOT':
        return 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029'; 
      case 'TRX':
        return 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029';  
      case 'MATIC':
        return 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029';  
      case 'SHIB':
        return 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=029';  
      case 'LTC':
        return 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=029';  
      case 'XLM':
        return 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=029';  
      case 'XMR':
        return 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=029';  
      }
    };

  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getCryptoList();
        setLoading(false);
        setStockList(apiData);
        const storedSymbol = localStorage.getItem("selectedCryptoSymbol");
        const storedPrice = localStorage.getItem("selectedCryptoPrice");
        const storedName = localStorage.getItem("selectedCryptoName");
        console.log('1st symbol:', storedSymbol, '1st price:', storedPrice);
        if (storedSymbol || storedPrice) {
          setSymbol(storedSymbol);
          setPrice(storedPrice);
          setSelectedStockName(storedName);
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
                  <img className="w-8 mr-3" src={getImageLink(symbol)} alt={symbol} />
                  <div className="mt-1 font-bold font-serif text-lg">{selectedStockName}</div>
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
            <CryptoTransactions updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} />
          </div>

          <div className="flex">
              <CryptoMiniPortfolio updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory} setUpdateBalanceFlag={setUpdateBalanceFlag} />
          </div>
      </div>
    </>
  );
};

export default BuyCrypto;
