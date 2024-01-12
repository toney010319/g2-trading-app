import { useState, useEffect } from "react";
import {
  getStockList,
  buyStocks,
} from "../../../lib/api";
import StocksTransactions from "./StocksTransactions";
import Loading from "../../../components/Loading";

const BuyStocks = () => {
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

      const { success, message } = await buyStocks(
        user_id,
        quantity,
        adjustedPrice,
        symbol
      );
      if (success) {
        console.log("Stock purchased successfully:", message);
        setQuantity("");
        setPrice("Select a stock");
        setSymbol("Select a stock");
        setUpdateTransactionHistory(true);
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
      case 'AAPL':
        return 'https://media2.giphy.com/media/tYiGDt4b33UVq/giphy.gif?cid=ecf05e47tv173exg1c73jj33houcjbxzvnuyxluyygu071ni&ep=v1_stickers_search&rid=giphy.gif&ct=s';
      case 'MSFT':
        return 'https://media2.giphy.com/media/lkdPnAgct5JYvnddL9/giphy.gif?cid=ecf05e47vuw4fcydsrpot105jbjq4brgusmi8viupjfuo4na&ep=v1_stickers_search&rid=giphy.gif&ct=s';
      case 'AMZN':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322';
      case 'NVDA':
        return 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/351px-Nvidia_logo.svg.png?20150924223142';
      case 'GOOG':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911'; 
      case 'GOOGL':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911';   
      case 'TSLA':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/279px-Tesla_Motors.svg.png';  
      case 'BFOCX':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Berkshire_Bank_logo.svg/355px-Berkshire_Bank_logo.svg.png'; 
      case 'META':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png'; 
      case 'JPFAX':
        return 'https://cdn.worldvectorlogo.com/logos/jp-morgan.svg';  
      case 'VISAX':
        return 'https://logojinni.com/image/logos/virtus-2.svg';  
      case 'COST':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/512px-Costco_Wholesale_logo_2010-10-26.svg.png';  
      case 'PEP':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Pepsi_logo_%282014%29.svg/800px-Pepsi_logo_%282014%29.svg.png?20230105182856';  
      case 'COKE':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/512px-Coca-Cola_logo.svg.png?20231211133000';  
      case 'ADBE':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/512px-Adobe_Corporate_logo.svg.png';  
      case 'NFLX':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158';  
      case 'INTC':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/395px-Intel_logo_%282020%2C_light_blue%29.svg.png';  
      case 'AMD':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/800px-AMD_Logo.svg.png';  
      case 'LEGO':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/512px-LEGO_logo.svg.png'; 
      case 'MNST':
        return 'https://cdn.worldvectorlogo.com/logos/monster-energy.svg';  
      default:
        return ''; 
      }
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
                <div className="bg-white flex underline underline-offset-4 justify-center rounded-md shadow-lg p-4 my-2 mx-4">
                  <img className="w-10 mr-3" src={getImageLink(symbol)} alt={symbol} />
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
              <div className="flex justify-center mb-2 font-semibold text-lg h-48">Choose a stock</div>
            )}

            <button
              className="text-white px-4 py-2 bg-azure-500 rounded-md hover:bg-azure-700 mb-2"
              onClick={handleBuyStocks}
            >
              Buy Shares
            </button>
          </div>
        )}
          <div className="flex">
            <StocksTransactions updateTransactionHistory={updateTransactionHistory} setUpdateTransactionHistory={setUpdateTransactionHistory}/>
          </div>
      </div>
    </>
  );
};

export default BuyStocks;
