import { useState, useEffect, useMemo } from "react";
import { getCryptoList } from "../../../../lib/api";
import Loading from "../../../../components/Loading";

const BuyCryptoMarket = () => {
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = document.cookie.split('user_id=')[1];
    
    const fetchStockListMemoized = useMemo(() => async () => {
        try {
        const response = await getCryptoList(user_id);
        setStockList(response);
        console.log('stocklist', response)
        setLoading(false);
        } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
        }
    }, [user_id]);
    
    useEffect(() => {
        fetchStockListMemoized();
    }, [fetchStockListMemoized]);

    const getImageLink = (symbol) => {
      switch (symbol) {
        case 'BTC':
          return 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029';
        case 'ETH':
          return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029';
        case 'BNB':
          return 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029';
        case 'SOL':
          return 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029';
        case 'XRP':
          return 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029'; 
        case 'ADA':
          return 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029';   
        case 'AVAX':
          return 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029';  
        case 'DOGE':
          return 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029'; 
        case 'DOT':
          return 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029'; 
        case 'TRX':
          return 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029';  
        case 'MATIC':
          return 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029';  
        case 'SHIB':
          return 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=029';  
        case 'LTC':
          return 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=029';  
        case 'XLM':
          return 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=029';  
        case 'XMR':
          return 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=029';  
        }
      };

    const getChangesStyle = (changesPercentage) => {
    return changesPercentage < 0 ? 'text-red-500' : 'text-green-500';
    };

return(
<>
<section className="container mx-auto p-2 font-mono">
    <div> 
        <div className="flex justify-center">
            
            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGR5emRjODQ0bDhsaXNpbzR0ODBqazNhMGVmaDRzZHBkd2dyM3FhZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aCPUvrFE4M6j8l2/giphy.gif" alt="stock market" className="w-8"/>  
            Popular on the Market
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
                                        <img className="rounded-full w-5" src={getImageLink(data.symbol)} alt={data.symbol} />
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


export default BuyCryptoMarket