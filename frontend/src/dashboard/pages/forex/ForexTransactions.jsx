import { useState, useMemo, useEffect } from "react";
import { getUserForex} from "../../../lib/api";
import { format } from "date-fns"
import Loading from "../../../components/Loading";

const ForexTransactions = ({ updateTransactionHistory, setUpdateTransactionHistory }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const sortedTransactions = transactions.user_forex
    ? [...transactions.user_forex].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);
  
  useEffect(() => {
  fetchTransactionsMemoized();
  if (updateTransactionHistory) {
    fetchTransactionsMemoized();
    setUpdateTransactionHistory(false);
  }
}, [updateTransactionHistory, fetchTransactionsMemoized, setUpdateTransactionHistory]);

  return (
    <>
    <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
              Recent Transactions
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
                  <th className="px-4 py-3">Transaction</th>
                  <th className="px-4 py-3">Created_at</th>
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
                      <tr key={userForex.id}>
                        <div className="flex">
                          <div className="flex">
                            <img className="ml-2 w-8" src={getImageLink(userForex.symbol)} alt={userForex.symbol} />
                          </div>
                          <td className="px-4 py-3">{userForex.symbol}</td>
                        </div>
                        <td className="px-4 py-3 text-center">{parseFloat(userForex.quantity).toFixed(0)}</td>
                        <td className="px-4 py-3 text-center">$ {parseFloat(userForex.price).toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">{(userForex.transaction_type).toUpperCase()}</td>
                        <td className="px-4 py-3 text-center">{format(new Date(userForex.created_at), 'MM/dd/yyyy HH:mm a')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center w-full h-10">
                          No Transactions
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

export default ForexTransactions;
