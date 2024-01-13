import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import { getStockList } from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
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

  const getImageLink = (symbol) => {
    switch (symbol) {
      case 'AAPL':
        return 'https://media2.giphy.com/media/tYiGDt4b33UVq/giphy.gif?cid=ecf05e47tv173exg1c73jj33houcjbxzvnuyxluyygu071ni&ep=v1_stickers_search&rid=giphy.gif&ct=s';
      case 'MSFT':
        return 'https://media2.giphy.com/media/lkdPnAgct5JYvnddL9/giphy.gif?cid=ecf05e47vuw4fcydsrpot105jbjq4brgusmi8viupjfuo4na&ep=v1_stickers_search&rid=giphy.gif&ct=s';
      case 'AMZN':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322';
      case 'NVDA':
        return 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/351px-Nvidia_logo.svg.png?20150924223142';
      case 'GOOG':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911'; 
      case 'GOOGL':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911';   
      case 'TSLA':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/279px-Tesla_Motors.svg.png';  
      case 'BFOCX':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Berkshire_Bank_logo.svg/355px-Berkshire_Bank_logo.svg.png'; 
      case 'META':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png'; 
      case 'JPFAX':
        return 'https://cdn.worldvectorlogo.com/logos/jp-morgan.svg';  
      case 'VISAX':
        return 'https://logojinni.com/image/logos/virtus-2.svg';  
      case 'COST':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/512px-Costco_Wholesale_logo_2010-10-26.svg.png';  
      case 'PEP':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Pepsi_logo_%282014%29.svg/800px-Pepsi_logo_%282014%29.svg.png?20230105182856';  
      case 'COKE':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/512px-Coca-Cola_logo.svg.png?20231211133000';  
      case 'ADBE':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/512px-Adobe_Corporate_logo.svg.png';  
      case 'NFLX':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158';  
      case 'INTC':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/395px-Intel_logo_%282020%2C_light_blue%29.svg.png';  
      case 'AMD':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/800px-AMD_Logo.svg.png';  
      case 'LEGO':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/512px-LEGO_logo.svg.png'; 
      case 'MNST':
        return 'https://cdn.worldvectorlogo.com/logos/monster-energy.svg';  
      default:
        return ''; 
      }
    };

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
            <span className="flex w-full justify-center text-bold text-3xl font-sans underline underline-offset-4 font-bold mb-2">  
              Market List
            </span>
            <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by name or symbol"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                                className="hover:scale-105 hover:border-2 hover:border-blue-500 cursor-pointer flex"
                                onClick={() => {
                                  localStorage.setItem('selectedStockSymbol', data.symbol);
                                  localStorage.setItem('selectedStockName', data.name);
                                  localStorage.setItem('selectedStockPrice', data.price);
                                  navigate('/dashboard/stocks/trade');
                                }}
                                >
                                  <img className="w-10" src={getImageLink(data.symbol)} alt={data.symbol} />
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
        <span>Disclaimer: This a real data fetch on January 9, 2024</span>
      </section>

    </>
  );
};

export default MarketStocks;
