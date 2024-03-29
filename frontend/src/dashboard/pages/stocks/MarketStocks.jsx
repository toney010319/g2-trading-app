import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import { getStockList } from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
import { getImageLinkStocks } from '../../../assets/Icons';
const MarketStocks = () => {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('')
  const rowsPerPage = 11;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getStockList();
        setStockList(apiData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const getChangesStyle = (changesPercentage) => {
    return changesPercentage < 0 ? 'text-red-500' : 'text-green-500';
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stockList.slice(indexOfFirstRow, indexOfLastRow);

  const filteredRows = currentRows.filter((data) =>
  data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  data.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-3xl font-sans underline underline-offset-4 font-bold mb-2 bg-white rounded-md mr-1">  
              MARKET LIST
            </span>
            <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by name or symbol"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-300"
            />
          </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full mb-12 pb-4 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="text-center px-4 py-3">Name</th>
                  <th className="text-center px-4 py-3">Symbol</th>
                  <th className="text-center px-4 py-3">Price ($)</th>
                  <th className="text-center px-4 py-3">Highest Price Today</th>
                  <th className="text-center px-4 py-3">Lowest Price Today</th>
                  <th className="text-center px-4 py-3">Highest Price 1Y</th>
                  <th className="text-center px-4 py-3">Lowest Price 1Y</th>
                  <th className="text-center px-4 py-3">Market Cap</th>
                  <th className="text-center px-4 py-3">Volume</th>
                  <th className="text-center px-4 py-3">Average Volume</th>
                  <th className="text-center px-4 py-3">Percentage +/-</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      <div className="flex justify-center w-full h-10">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRows.length > 0 ? (
                    filteredRows.map((data) => (
                      <tr key={data.id} className="text-gray-700">
                        <td className="px-2 py-2 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <div className="flex font-semibold text-black">
                                
        
                            
                                <div 
                                className="hover:scale-105 hover:border-2 hover:border-gray-500 cursor-pointer flex"
                                onClick={() => {
                                  localStorage.setItem('selectedStockSymbol', data.symbol);
                                  localStorage.setItem('selectedStockName', data.name);
                                  localStorage.setItem('selectedStockPrice', data.price);
                                  navigate('/dashboard/stocks');
                                }}
                                >
                                  <img className="w-10" src={getImageLinkStocks(data.symbol)} alt={data.symbol} />
                                  <span className="ml-1">{data.name}</span>
                                </div>
          
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">{data.symbol}</td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">${data.price}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_high}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_low}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.year_high}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.year_low}</td>
                        <td className="px-4 py-3 text-xs text-center border">{data.market_cap}</td>
                        <td className="px-4 py-3 text-xs text-center border">{data.volume}</td>
                        <td className="px-4 py-3 text-xs text-center border">{data.avg_volume}</td>
                        <td className={`px-4 py-3 text-ms text-center font-semibold border ${getChangesStyle(data.changes_percentage)}`}>
                          {data.changes_percentage}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center py-4">
                        No Data
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 ">
              {[...Array(Math.ceil(stockList.length / rowsPerPage)).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`mx-2 px-3 py-1 focus:outline-none ${currentPage === page + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        <span className="bg-white opacity-50 rounded-md p-1">Disclaimer: This a real data fetch on January 9, 2024</span>
      </section>

    </>
  );
};

export default MarketStocks;
