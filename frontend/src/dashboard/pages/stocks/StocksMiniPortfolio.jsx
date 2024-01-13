import { useState, useMemo, useEffect } from "react";
import { getUserStocks } from "../../../lib/api";
import Loading from "../../../components/Loading";

const StocksMiniPortfolio = ({ updateTransactionHistory, setUpdateTransactionHistory }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [aggregatedData, setAggregatedData] = useState([]);
  const transactionsPerPage = 5;
  
  const fetchTransactionsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserStocks(user_id);
      setTransactions(response);
      setLoading(false);
      console.log('Stock Transaction Resp', response)
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const sortedTransactions = transactions.user_stocks
    ? [...transactions.user_stocks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginatedTransactions = aggregatedData.slice(startIndex, endIndex);

  
  
  useEffect(() => {
  fetchTransactionsMemoized();
  if (updateTransactionHistory) {
    fetchTransactionsMemoized();
    setUpdateTransactionHistory(false);
  }
}, [updateTransactionHistory, fetchTransactionsMemoized, setUpdateTransactionHistory]);



  useEffect(() => {
    if (transactions.user_stocks) {
      const symbolDataMap = new Map();

      transactions.user_stocks.forEach((transaction) => {
        const symbol = transaction.symbol;
        const quantity = parseFloat(transaction.quantity);
        const price = parseFloat(transaction.price);

        if (symbolDataMap.has(symbol)) {
          const existingData = symbolDataMap.get(symbol);
          symbolDataMap.set(symbol, {
            quantity: existingData.quantity + quantity,
            price: existingData.price + quantity * price,
          });
        } else {
          symbolDataMap.set(symbol, {
            quantity,
            price: quantity * price,
          });
        }
      });

      const aggregatedArray = Array.from(symbolDataMap, ([symbol, { quantity, price }]) => ({
        symbol,
        quantity,
        price,
      }));

      setAggregatedData(aggregatedArray);
    }
  }, [transactions.user_stocks]);

  return (
    <>
    <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
              Stock Assets
            </span>
          </div>
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="flex justify-center w-full h-10">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((userStock) => (
                      <tr key={userStock.id}>
                        <div className="flex">
                          <div className="flex">
                            <img className="ml-2 w-12" src={getImageLink(userStock.symbol)} alt={userStock.symbol} />
                          </div>
                          <td className="px-4 py-3">{userStock.symbol}</td>
                        </div>
                        <td className="px-4 py-3 text-center">{parseFloat(userStock.quantity).toFixed(0)}</td>
                        <td className="px-4 py-3 text-center">$ {parseFloat(userStock.price).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center w-full h-10">
                          No Assets
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
              <div className="flex justify-center w-full  mt-4 mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleNextPage}
                  disabled={endIndex >= sortedTransactions.length}
                >
                  Next
                </button>
              </div>
          </div>
        </div>
      </section>
    </div>
  </>
);
};

export default StocksMiniPortfolio;
