import { getTransactions } from '../../../lib/api'
import { useState, useEffect, useMemo } from 'react';
import Loading from '../../../components/Loading';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = document.cookie.split('user_id=')[1];

  const fetchTransactionsMemoized = useMemo(() => async () => {
    try {
      const response = await getTransactions(user_id);
      setTransactions(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    fetchTransactionsMemoized();
  }, [fetchTransactionsMemoized]);

  return (
    <>
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Transaction Number</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">D/C</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
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
                transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="text-gray-700">
                      <td className="px-2 py-2 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold text-black">{transaction.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">{transaction.transaction_number}</td>
                      <td className="px-4 py-3 text-ms font-semibold border">{transaction.amount}</td>
                      <td className="px-4 py-3 text-ms font-semibold border">{transaction.debit_credit}</td>
                      <td className="px-4 py-3 text-ms font-semibold border">{transaction.transaction_type}</td>
                      <td className="px-4 py-3 text-xs border">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{transaction.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No transactions
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </>
  );
};

export default TransactionHistory;