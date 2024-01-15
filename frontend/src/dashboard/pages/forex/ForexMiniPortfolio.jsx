import { useState, useMemo, useEffect } from "react";
import { getUserForex } from "../../../lib/api";
import Loading from "../../../components/Loading";
import SellForex from "./modals/SellForex";

const ForexMiniPortfolio = ({ updateTransactionHistory, setUpdateTransactionHistory, setUpdateBalanceFlag }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const transactionsPerPage = 5;
  
  const fetchTransactionsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserForex(user_id);
      setTransactions(response);
      setLoading(false);
      console.log('Forex Transaction Resp', response)
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

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
      const userForex = transactions.user_forex || [];
      const buyTransactions = userForex.filter((transaction) => transaction.transaction_type === 'buy');
      const sellTransactions = userForex.filter((transaction) => transaction.transaction_type === 'sell');
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
    }, [transactions.user_forex]);

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
        <SellForex
          handleClose={closeModal}
          addAlert={() => {}}
          selectedAsset={selectedAsset}
          setUpdateBalanceFlag={setUpdateBalanceFlag}
        />
      )}

    <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
              Currency Assets
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
                    paginatedTransactions.map((userForex) => (
                      <tr className="cursor-pointer hover:border-azure-950 hover:border-4 hover:scale-105" key={userForex.id} onClick={() => openModal(userForex.symbol)}>
                        <td className="px-4 py-3">
                          <div className="flex">
                            <div className="flex">
                              <img className="ml-2 w-8" src={getImageLink(userForex.symbol)} alt={userForex.symbol} />
                            </div>
                            <span className="ml-2">{userForex.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{parseFloat(userForex.quantity).toFixed(0)}</td>
                        <td className="px-4 py-3 text-center">$ {parseFloat((userForex.price)*(userForex.quantity)).toFixed(2)}</td>
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
  )
}

export default ForexMiniPortfolio;
