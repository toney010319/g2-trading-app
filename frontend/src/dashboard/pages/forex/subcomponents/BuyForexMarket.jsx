import { useState, useEffect, useMemo } from "react";
import { getForexList } from "../../../../lib/api";
import Loading from "../../../../components/Loading";

const BuyForexMarket = () => {
    const [forexList, setForexList] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = document.cookie.split('user_id=')[1];
    
    const fetchStockListMemoized = useMemo(() => async () => {
        try {
        const response = await getForexList(user_id);
        setForexList(response);
        console.log('forex list', response)
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
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Price ($)</th>
                <th className="px-4 py-3">Highest Price Today</th>
                <th className="px-4 py-3">Lowest Price Today</th>
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
                forexList.length > 0 ? (
                  forexList.slice(0, 5).map((data) => (
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
                      <td className="px-4 py-3 text-ms text-center font-semibold border">{data.country}</td>
                      <td className="px-4 py-3 text-ms text-center font-semibold border">${data.price}</td>
                      <td className="px-4 py-3 text-xs text-center border">${data.day_high}</td>
                      <td className="px-4 py-3 text-xs text-center border">${data.day_low}</td>
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


export default BuyForexMarket