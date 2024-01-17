import { useEffect, useMemo, useState } from "react"
import { getTransactions } from "../../lib/adminapi";
import Loading from "../../components/Loading";


const TransactionLogs = () => {
    const [transaction, setTransaction] = useState()
    const [loading, setLoading] = useState(true);
    const fetchTransactionsMemoized = useMemo(
        () => async () => {
            try {
                const response = await getTransactions();
                console.log("res", response)
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
        console.log("AdminVerifcation")
        fetchTransactionsMemoized();
    }, [fetchTransactionsMemoized])

    return (
        <div>
            <>
                <p className=" flex justify-center  text-lg font-bold w-full mt-5">Verify Users</p>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Username</th>
                                        <th className="px-4 py-3">Transaction Number</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">D/C</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Symbols</th>
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
                                    ) : transaction.length > 0 ? (
                                        transaction.map((user, index) => (
                                            <tr key={index} className="text-gray-700">
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.created_at}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{`${user.user_username}`}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.transaction_number}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.amount || user.price}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.debit_credit || "N/A"}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.transaction_type}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.symbol || "N/A"}</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">{user.status || "success"}</td>


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
                        </div>
                    </div>
                </section>

            </>
        </div>
    )
}

export default TransactionLogs
