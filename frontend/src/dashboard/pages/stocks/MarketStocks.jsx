import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import { getStockList } from '../../../lib/api';

const MarketStocks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getStockList(); 
        setData(apiData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>Average Volume</th>
            <th>Change</th>
            <th>Changes Percentage</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8"><Loading/></td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>{item.price}</td>
                <td>{item.market_cap}</td>
                <td>{item.volume}</td>
                <td>{item.avg_volume}</td>
                <td>{item.change}</td>
                <td>{item.changes_percentage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketStocks;