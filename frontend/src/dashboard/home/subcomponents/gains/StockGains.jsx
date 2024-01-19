import { useState, useEffect, useMemo } from "react";
import { getStockList } from "../../../../lib/api";

const StockGains = () => {
    const user_id = document.cookie.split("user_id=")[1];
    const [stockList, setStockList] = useState([]);

    const fetchStockList = useMemo(
        () => async () => {
            try {
                const response = await getStockList(user_id);
                setStockList(response);

            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        },
        [user_id]
    );

    useEffect(() => {
        fetchStockList();
    }, [fetchStockList]);

    const filteredStockList = stockList.filter(
        (stock) => parseFloat(stock.changes_percentage) !== 0
    );

    const sortedStockList = filteredStockList.sort(
        (a, b) => parseFloat(b.changes_percentage) - parseFloat(a.changes_percentage)
    );

    return (
        <>
        <div className="mx-2 bg-white rounded-md shadow-md hover:ring-gray-400 hover:border-4 hover:border-gray-300 hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-center font-bold mb-2">Top Stock Gainers</h1>
        <table className="min-w-full border border-collapse">
            <thead>
            <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Change</th>
            </tr>
            </thead>
            <tbody>
            {sortedStockList.slice(0, 5).map((stock, index) => (
                <tr key={index} className="border p-2">
                <td className="text-center border p-2">{index + 1}</td>
                <td className="border p-2">
                    <span className="font-bold text-sm">{stock.name}</span>
                </td>
                <td className={`text-center border p-2 font-bold ${parseFloat(stock.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}>
                <div className="inline-flex items-center">
                    <span className={`mr-2 font-bold text-sm ${parseFloat(stock.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {parseFloat(stock.changes_percentage).toFixed(2)}%
                    </span>
                    {parseFloat(stock.changes_percentage) < 0 ? (
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/640px-Red_Arrow_Down.svg.png" alt="Arrow Down" width="7" height="7" />
                    ) : (
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png?20190502180104" alt="Arrow Up" width="7" height="5" />
                    )}
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        <div className="mx-2 bg-white rounded-md shadow-md hover:ring-gray-400 hover:border-4 hover:border-gray-300 hover:scale-105 duration-300 ease-in-out">
            <h1 className="text-center font-bold mb-2 ">Top Stock Losers</h1>
            <table className="min-w-full border border-collapse">
            <thead>
                <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Change</th>
                </tr>
            </thead>
            <tbody>
                {sortedStockList.slice(-5).reverse().map((stock, index) => (
                <tr key={index} className="border p-2">
                    <td className="text-center border p-2">{index + 1}</td>
                    <td className="border p-2">
                    <span className="font-bold text-sm">{stock.name}</span>
                    </td>
                    <td className="text-center border p-2 font-bold text-lg">
                    <div className="inline-flex items-center">
                        <span className={`mr-2 font-bold text-sm ${parseFloat(stock.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {parseFloat(stock.changes_percentage).toFixed(2)}%
                        </span>
                        {parseFloat(stock.changes_percentage) < 0 ? (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/640px-Red_Arrow_Down.svg.png" alt="Arrow Down" width="7" height="7" />
                        ) : (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png?20190502180104" alt="Arrow Up" width="7" height="5" />
                        )}
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </>
    );
};

export default StockGains;