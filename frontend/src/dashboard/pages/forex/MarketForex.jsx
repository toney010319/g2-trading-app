import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { getForexList } from '../../../lib/api';
import { useState, useEffect } from 'react';
import { getImageLinkForex } from '../../../assets/Icons';

const MarketForex = () => {
  const [forexList, setForexList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredForexList, setFilteredForexList] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates] = useState({
    USD: 55.821634,
    EUR: 61.13359,
    JPY: 0.38521223,
    GBP: 71.163349,
    AUD: 37.315536,
    CAD: 41.619369,
    CHF: 65.462742,
    CNY: 7.8394008,
    SEK: 5.4363023,
    MXN: 3.3095058,
    NZD: 34.831976,
    SGD: 41.885684,
    HKD: 7.1387497,
    NOK: 5.4030902,
    KRW: 0.042491803,
    TRY: 1.8542325,
    INR: 0.6734733,
    RUB: 0.63173204,
    BRL: 11.479311,
    ZAR: 2.9958348,
    DKK: 8.1955938,
    TWD: 1.7950279,
    PLN: 14.024586,
    THB: 1.5921923,
    MYR: 12.010947,
  });
  const rowsPerPage = 11;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getForexList(); 
        setForexList(apiData);
        setFilteredForexList(apiData)
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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);

    const filteredList = forexList.filter(
      (data) =>
        data.name.toLowerCase().includes(query) ||
        data.symbol.toLowerCase().includes(query) ||
        data.country.toLowerCase().includes(query)
    );

    setFilteredForexList(filteredList);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredForexList.slice(indexOfFirstRow, indexOfLastRow);

  const filteredRows = currentRows.filter((data) =>
  data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  data.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencySwitch = (currency) => {
    setSelectedCurrency(currency);
  };

  const renderPrice = (price, symbol) => {
    const exchangeRate = exchangeRates[symbol] || 1; 

    if (selectedCurrency === 'USD' || symbol === 'USD') {
      return `$${price}`;
    } else if (selectedCurrency === 'PHP' || symbol === 'PHP') {
      return `₱${((exchangeRate / price )*(price)).toFixed(5)}`;
    } else {
  
      return `${(price * exchangeRate).toFixed(5)} ${symbol}`;
    }
  };

  return (
    <>
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-bold text-3xl font-sans underline underline-offset-8 font-bold mb-2 bg-white rounded-md mr-1">  
              CURRENCIES
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
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleCurrencySwitch('USD')}
                className={`rounded-t-lg mx-2 px-3 py-1 focus:outline-none ${selectedCurrency === 'USD' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
              >
                USD
              </button>
              <button
                onClick={() => handleCurrencySwitch('PHP')}
                className={`rounded-t-lg mx-2 px-3 py-1 focus:outline-none ${selectedCurrency === 'PHP' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
              >
                PHP
              </button>
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
                  <th className="text-center px-4 py-3">Country</th>
                  <th className="text-center px-4 py-3">Price</th>
                  <th className="text-center px-4 py-3">Highest Price Today</th>
                  <th className="text-center px-4 py-3">Lowest Price Today</th>
                  <th className="text-center px-4 py-3">Highest Price 1Y</th>
                  <th className="text-center px-4 py-3">Lowest Price 1Y</th>
                  <th className="text-center px-4 py-3">Volume</th>
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
                                  localStorage.setItem('selectedForexSymbol', data.symbol);
                                  localStorage.setItem('selectedForexoName', data.name);
                                  localStorage.setItem('selectedForexPrice', data.price);
                                  navigate('/dashboard/forex');
                                }}
                                >
                                  <img className="w-6 mr-1" src={getImageLinkForex(data.symbol)} alt={data.symbol} />
                                  <span className="ml-1">{data.name}</span>
                                </div>
          
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">{data.symbol}</td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">{data.country}</td>
                        <td className="px-4 py-3 text-ms text-center font-semibold border">
                          {renderPrice(data.price, data.symbol)}
                        </td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_high}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.day_low}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.year_high}</td>
                        <td className="px-4 py-3 text-xs text-center border">${data.year_low}</td>
                        <td className="px-4 py-3 text-xs text-center border">{parseFloat(data.volume).toFixed(2)}</td>
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
              {[...Array(Math.ceil(forexList.length / rowsPerPage)).keys()].map((page) => (
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
s
    </>
  );
};

export default MarketForex;