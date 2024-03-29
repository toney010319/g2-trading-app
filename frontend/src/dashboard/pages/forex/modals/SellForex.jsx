import { useState, useEffect, useMemo } from "react";
import { getUserForex, sellForex } from "../../../../lib/api";
import Loading from "../../../../components/Loading";


// eslint-disable-next-line react/prop-types
const SellForex = ({ handleClose, selectedAsset, setUpdateBalanceFlag }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;

  const fetchUserForexMemoized = useMemo(
    () => async () => {
      try {
        const response = await getUserForex(user_id);

        setTransactions(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching transactions:', error);
      }
    },
    [user_id, selectedAsset]
  );

  const handleSellForex = async (userForex) => {
    try {
      const { quantity, price, symbol } = userForex;
      if (quantity === undefined || price === undefined || symbol === undefined) {
        console.error('Invalid userForex format');
        return;
      }
      const sellResponse = await sellForex({
        user_id,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        symbol: symbol,
      });

      handleClose(close);
      fetchUserForexMemoized();
      setUpdateBalanceFlag(true);
    } catch (error) {
      console.error('Error selling forex:', error);
    }
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
    fetchUserForexMemoized()
  }, [user_id])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredAndGroupedTransactions = useMemo(() => {
    const userForex = transactions.user_forex || [];
    const buyTransactions = userForex.filter((transaction) => transaction.transaction_type === 'buy');
    const sellTransactions = userForex.filter((transaction) => transaction.transaction_type === 'sell');
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
  }, [transactions.user_forex, selectedAsset]);

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
                  Forex Assets
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
                    paginatedTransactions.map((userForex, index) => (
                      <tr key={userForex.id}>
                        <td className="px-4 py-3 text-center">
                          {index + 1 + (currentPage - 1) * transactionsPerPage}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex">
                            <div className="flex">
                              <img
                                className="w-12 inline-flex rounded-full"
                                src={getImageLink(userForex.symbol)}
                                alt={userForex.symbol}
                              />
                            </div>
                            <span className="flex">{userForex.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {parseFloat(userForex.quantity).toFixed(0)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userForex.price).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userForex.price * userForex.quantity).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                          
                          <button 
                          onClick={() => handleSellForex(userForex)}
                          className="p-2 px-5 text-white font-bold bg-gray-500 hover:bg-gray-700 rounded-md"

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
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-gray-500 hover.bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
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

export default SellForex;