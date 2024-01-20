import { useEffect, useMemo, useState } from "react"
import { getTransactions } from "../../lib/adminapi";
import Loading from "../../components/Loading";
import { format } from "date-fns/format";


const TransactionLogs = () => {
    const [transaction, setTransaction] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 13;

    const fetchTransactionsMemoized = useMemo(
        () => async () => {
            try {
                const response = await getTransactions();

                setTransaction(response)
                setLoading(false);

                return response;
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setLoading(false);
            }
        },
        []
    );
    useEffect(() => {

        fetchTransactionsMemoized();
    }, [fetchTransactionsMemoized])

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = transaction.slice(startIndex, endIndex);
    const totalPages = Math.ceil(transaction.length / itemsPerPage);

    return (
        <div>
            <>
                
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg bg-white">
                    <p className=" flex justify-center  text-2xl font-bold w-full mt-5 mb-1">Transaction History</p>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3 text-center">Date</th>
                                        <th className="px-4 py-3 text-center">Username</th>
                                        <th className="px-4 py-3 text-center">Transaction Number</th>
                                        <th className="px-4 py-3 text-center">Amount</th>
                                        <th className="px-4 py-3 text-center">D/C</th>
                                        <th className="px-4 py-3 text-center">Type</th>
                                        <th className="px-4 py-3 text-center">Symbols</th>
                                        <th className="px-4 py-3 text-center">Status</th>

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
                                        paginatedTransactions.map((user, index) => (
                                            <tr key={index} className="text-gray-700">
                                                <td className="px-4 py-3 text-ms font-semibold border text-center"> {user.created_at ? format(user.created_at, 'MM/dd/yyyy HH:mm:ss a'): 'N/A'}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{`${user.user_username}`}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{user.transaction_number}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{user.amount || user.price}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{user.debit_credit || "N/A"}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{(user.transaction_type).toUpperCase()}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{user.symbol || "N/A"}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border text-center">{user.status ? user.status.toUpperCase() : "SUCCESS"}</td>


                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                No User
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-center m-4">
                                <button
                                    onClick={handlePrevPage}
                                    className="cursor-pointer text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950 mr-2"
                                    disabled={currentPage === 1}
                                >
                                    Previous Page
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className="cursor-pointer text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950"
                                    disabled={currentPage === totalPages}
                                >
                                    Next Page
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        </div>
    )
}

export default TransactionLogs
