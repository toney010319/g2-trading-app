import { useState, useEffect, useMemo } from "react";
import { getForexList } from "../../../../lib/api";

const ForexGains = () => {
    const user_id = document.cookie.split("user_id=")[1];
    const [forexList, setForexList] = useState([]);

    const fetchForexList = useMemo(
        () => async () => {
        try {
            const response = await getForexList(user_id);
            setForexList(response);
            console.log('Cryptolist', response)
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        },
        [user_id]
    );

    useEffect(() => {
        fetchForexList();
    }, [fetchForexList]);

    const filteredForexList = forexList.filter(
        (forex) => parseFloat(forex.changes_percentage) !== 0
    );

    const sortedForexList = filteredForexList.sort(
        (a, b) => parseFloat(b.changes_percentage) - parseFloat(a.changes_percentage)
    );

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


    return (
        <>
        <div className="mx-2 bg-white rounded-md shadow-md">
        <h1 className="text-center font-bold mb-2">Top Currency Gainers</h1>
        <table className="min-w-full border border-collapse">
            <thead>
            <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Logo</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Change</th>
            </tr>
            </thead>
            <tbody>
            {sortedForexList.slice(0, 5).map((forex, index) => (
                <tr key={index} className="border p-2">
                <td className="text-center border p-2">{index + 1}</td>
                <td className="border p-2">
                    <img src={getImageLink(forex.symbol)} alt={`${forex.symbol} Logo`} width="30" height="60" />
                </td>
                <td className="border p-2">
                    <span className="font-bold text-sm">{forex.name}</span>
                </td>
                <td className={`text-center border p-2 font-bold ${parseFloat(forex.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}>
                <div className="inline-flex items-center">
                    <span className={`mr-2 font-bold text-sm ${parseFloat(forex.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {parseFloat(forex.changes_percentage).toFixed(2)}%
                    </span>
                    {parseFloat(forex.changes_percentage) < 0 ? (
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

        <div className="mx-2 bg-white rounded-md shadow-md">
            <h1 className="text-center font-bold mb-2 ">Top Currency Losers</h1>
            <table className="min-w-full border border-collapse">
            <thead>
                <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Logo</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Change</th>
                </tr>
            </thead>
            <tbody>
                {sortedForexList.slice(-4).reverse().map((forex, index) => (
                <tr key={index} className="border p-2">
                    <td className="text-center border p-2">{index + 1}</td>
                    <td className="border p-2">
                    <img src={getImageLink(forex.symbol)} alt={`${forex.symbol} Logo`} width="30" height="60" />
                    </td>
                    <td className="border p-2">
                    <span className="font-bold text-sm">{forex.name}</span>
                    </td>
                    <td className="text-center border p-2 font-bold">
                    <div className="inline-flex items-center">
                        <span className={`mr-2 font-bold text-sm ${parseFloat(forex.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {parseFloat(forex.changes_percentage).toFixed(2)}%
                        </span>
                        {parseFloat(forex.changes_percentage) < 0 ? (
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

export default ForexGains;