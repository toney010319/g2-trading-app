import { useState, useMemo, useEffect } from "react";
import { getUserStocks } from "../../../lib/api";
import SellStocks from "./modals/SellStock";
import Loading from "../../../components/Loading";

const StocksMiniPortfolio = ({ updateTransactionHistory, setUpdateTransactionHistory, setUpdateBalanceFlag }) => {
    const user_id = document.cookie.split("user_id=")[1];
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const transactionsPerPage = 4;
    
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
  
    const openModal = (assetSymbol) => {
      setSelectedAsset(assetSymbol);
    };
  
    const closeModal = () => {
      setSelectedAsset(null);
      setUpdateTransactionHistory(true);
      setUpdateBalanceFlag(true);
    };

      
      const filteredAndGroupedTransactions = useMemo(() => {
        const userStocks = transactions.user_stocks || [];
        const buyTransactions = userStocks.filter((transaction) => transaction.transaction_type === 'buy');
        const sellTransactions = userStocks.filter((transaction) => transaction.transaction_type === 'sell');
        const pairedTransactions = [];
    
        for (const buyTransaction of buyTransactions) {
          const correspondingSell = sellTransactions.find(
            (sellTransaction) =>
              sellTransaction.symbol === buyTransaction.symbol &&
              sellTransaction.quantity === buyTransaction.quantity &&
              sellTransaction.price === buyTransaction.price &&
              !pairedTransactions.includes(sellTransaction)
          );
      
      
          if (correspondingSell) {
            pairedTransactions.push(buyTransaction, correspondingSell);
          }
        }
        const unpairedBuyTransactions = buyTransactions.filter(
          (buyTransaction) => !pairedTransactions.includes(buyTransaction)
        );
        const groupedTransactions = unpairedBuyTransactions.reduce((result, transaction) => {
        const existingTransaction = result.find((t) => t.symbol === transaction.symbol);
      
          if (existingTransaction) {
            existingTransaction.quantity += parseFloat(transaction.quantity);
          } else {
            result.push({
              symbol: transaction.symbol,
              quantity: parseFloat(transaction.quantity),
              price: parseFloat(transaction.price),
            });
          }
      
          return result;
        }, []);
      
        return groupedTransactions;
      }, [transactions.user_stocks]);

      const startIndex = (currentPage - 1) * transactionsPerPage;
      const endIndex = startIndex + transactionsPerPage;
      const paginatedTransactions = filteredAndGroupedTransactions.slice(startIndex, endIndex);

    useEffect(() => {
      fetchTransactionsMemoized();  
      if (updateTransactionHistory) {
        fetchTransactionsMemoized(); 
        setUpdateTransactionHistory(false);
      }
    }, [updateTransactionHistory, fetchTransactionsMemoized, setUpdateTransactionHistory]);
  

    return (
      <>
      {selectedAsset && (
          <SellStocks
            handleClose={closeModal}
            addAlert={() => {}}
            selectedAsset={selectedAsset}
            setUpdateBalanceFlag={setUpdateBalanceFlag}
          />
        )}
  
      <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden marker:">
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
                        <tr className="cursor-pointer hover:border-azure-950 hover:border-4 hover:scale-105" key={userStock.id} onClick={() => openModal(userStock.symbol)}>
                          <td className="px-4 py-3">
                            <div className="flex">
                              <div className="flex">
                                <img className="ml-2 w-8" src={getImageLink(userStock.symbol)} alt={userStock.symbol} />
                              </div>
                              <span className="ml-2">{userStock.symbol}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">{parseFloat(userStock.quantity).toFixed(0)}</td>
                          <td className="px-4 py-3 text-center">$ {parseFloat((userStock.price)*(userStock.quantity)).toFixed(2)}</td>
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
                    disabled={endIndex >= filteredAndGroupedTransactions.length}
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
