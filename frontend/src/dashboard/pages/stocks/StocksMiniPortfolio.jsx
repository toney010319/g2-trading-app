import { useState, useMemo, useEffect } from "react";
import { getUserStocks } from "../../../lib/api";
import SellStocks from "./modals/SellStock";
import Loading from "../../../components/Loading";
import { getImageLinkStocks } from "../../../assets/Icons";

const StocksMiniPortfolio = ({ updateTransactionHistory, setUpdateTransactionHistory, setUpdateBalanceFlag, addAlert }) => {
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

    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

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
          addAlert={addAlert}
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
                                <img className="ml-2 w-8" src={getImageLinkStocks(userStock.symbol)} alt={userStock.symbol} />
                              </div>
                              <span className="ml-2">{userStock.symbol}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">{parseFloat(userStock.quantity).toFixed(0)}</td>
                          <td className="px-4 py-3 text-center">$ {parseFloat((userStock.price) * (userStock.quantity)).toFixed(2)}</td>
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
