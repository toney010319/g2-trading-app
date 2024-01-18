import { useState, useEffect, useMemo } from "react";
import { getUserStocks, sellStocks } from "../../../../lib/api";
import Loading from "../../../../components/Loading";
import { getImageLinkStocks } from "../../../../assets/Icons";


// eslint-disable-next-line react/prop-types
const SellStocks = ({ handleClose, selectedAsset, setUpdateBalanceFlag, addAlert }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;

  const fetchUserStocksMemoized = useMemo(
    () => async () => {
      try {
        const response = await getUserStocks(user_id);

        setTransactions(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching transactions:', error);
      }
    },
    [user_id, selectedAsset]
  );

  const handleSellStocks = async (userStock) => {
    try {
      const { quantity, price, symbol } = userStock;
      if (quantity === undefined || price === undefined || symbol === undefined) {
        console.error('Invalid userStock format');
        return;
      }
      const sellResponse = await sellStocks({
        user_id,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        symbol: symbol,
      });
      addAlert('success', `SUCCESSFULLY SOLD`)

      handleClose(close);
      fetchUserStocksMemoized();
      setUpdateBalanceFlag(true);
    } catch (error) {
      addAlert('error', `FAILED TRANSACTION`)
      console.error('Error selling stocks:', error);
    }
  };

  useEffect(() => {
    fetchUserStocksMemoized()
  }, [user_id])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredAndGroupedTransactions = useMemo(() => {
    const userStocks = transactions.user_stocks || [];
    const buyTransactions = userStocks.filter((transaction) => transaction.transaction_type === 'buy');
    const sellTransactions = userStocks.filter((transaction) => transaction.transaction_type === 'sell');
    const pairedTransactions = [];
    const filteredBuyTransactions = buyTransactions.filter((buyTransaction) =>
      buyTransaction.symbol === selectedAsset && parseFloat(buyTransaction.quantity) > 0
    );

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

    const unpairedBuyTransactions = filteredBuyTransactions.filter(
      (buyTransaction) => !pairedTransactions.includes(buyTransaction)
    );

    const groupedTransactions = unpairedBuyTransactions.reduce((result, transaction) => {
      const existingGroup = result.find(
        (group) =>
          group.symbol === transaction.symbol && group.quantity === transaction.quantity && group.price === transaction.price
      );

      if (existingGroup) {
        existingGroup.quantity += parseFloat(transaction.quantity);
      } else {
        result.push({
          symbol: transaction.symbol,
          quantity: parseFloat(transaction.quantity),
          price: parseFloat(transaction.price)
        });
      }

      return result;
    }, []);

    return groupedTransactions;
  }, [transactions.user_stocks, selectedAsset]);

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const paginatedTransactions = filteredAndGroupedTransactions.slice(startIndex, endIndex);


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          </div>
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="w-full overflow-x-auto">
              <div className="flex justify-center">
                <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
                  Stock Assets
                </span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Number</th>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Action</th>
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
                  ) : paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((userStock, index) => (
                      <tr key={userStock.id}>
                        <td className="px-4 py-3 text-center">
                          {index + 1 + (currentPage - 1) * transactionsPerPage}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex">
                            <div className="flex">
                              <img
                                className="w-12 inline-flex rounded-full"
                                src={getImageLinkStocks(userStock.symbol)}
                                alt={userStock.symbol}
                              />
                            </div>
                            <span className="flex">{userStock.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {parseFloat(userStock.quantity).toFixed(0)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userStock.price).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userStock.price * userStock.quantity).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">

                          <button
                            onClick={() => handleSellStocks(userStock)}
                            className="p-2 px-5 text-white font-bold bg-azure-500 hover:bg-azure-700 rounded-md"
                          >Sell
                          </button>
                        </td>



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
                  className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleNextPage}
                >
                  Next
                </button>
                <button
                  className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default SellStocks;