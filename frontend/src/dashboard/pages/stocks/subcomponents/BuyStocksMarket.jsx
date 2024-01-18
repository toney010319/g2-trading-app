import { useState, useEffect, useMemo } from "react";
import { getStockList } from "../../../../lib/api";
import Loading from "../../../../components/Loading";
import { getImageLinkStocks } from "../../../../assets/Icons";

const BuyStocksMarket = () => {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = document.cookie.split('user_id=')[1];

  const fetchStockListMemoized = useMemo(() => async () => {
    try {
      const response = await getStockList(user_id);
      setStockList(response);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    fetchStockListMemoized();
  }, [fetchStockListMemoized]);


  const getChangesStyle = (changesPercentage) => {
    return changesPercentage < 0 ? 'text-red-500' : 'text-green-500';
  };

  return (
    <>
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">

            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
              <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGR5emRjODQ0bDhsaXNpbzR0ODBqazNhMGVmaDRzZHBkd2dyM3FhZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aCPUvrFE4M6j8l2/giphy.gif" alt="stock market" className="w-8" />
              Popular Stocks on the Market
            </span>
          </div>
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Price ($)</th>
                  <th className="px-4 py-3">Highest Price Today</th>
                  <th className="px-4 py-3">Lowest Price Today</th>
                  <th className="px-4 py-3">Market Cap</th>
                  <th className="px-4 py-3">Average Volume</th>
                  <th className="px-4 py-3">Percentage +/-</th>
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
                  stockList.length > 0 ? (
                    stockList.slice(0, 5).map((data) => (
                      <tr key={data.id} className="text-gray-700">
                        <td className="px-2 py-2 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <div className="flex font-semibold text-black">
                                <span>
                                  <img className="rounded-full w-5" src={getImageLinkStocks(data.symbol)} alt={data.symbol} />
                                </span>
                                <span className="ml-1">{data.name}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">{data.symbol}</td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">${data.price}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_high}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_low}</td>
                        <td className="px-4 py-3 text-xs text-center border">{data.market_cap}</td>
                        <td className="px-4 py-3 text-xs text-center border">{data.avg_volume}</td>
                        <td className={`px-4 py-3 text-ms text-center font-semibold border ${getChangesStyle(data.changes_percentage)}`}>
                          {data.changes_percentage}%
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Error
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


export default BuyStocksMarket