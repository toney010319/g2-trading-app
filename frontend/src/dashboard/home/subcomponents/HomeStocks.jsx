import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie} from 'react-chartjs-2';
import { useState, useEffect, useMemo } from'react';
import { getUserStocks } from '../../../lib/api';
import Loading from '../../../components/Loading';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip);

const HomeStocks = () => {
  const user_id = document.cookie.split("user_id=")[1];
  const [assets, setAssets] = useState([]);

  const fetchAssetsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserStocks(user_id);
      setAssets(response.user_stocks)
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [user_id]);
  
  useEffect(() => {
    const initiateAuthorization = () => {
        const token = document.cookie.split('token=')[1];
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        }
    };
    initiateAuthorization();
    
}, []);
  
  useEffect(() => {
    fetchAssetsMemoized();
  }, [user_id]);

  const stockColors = {
    AAPL: [247, 147, 26],
    MSFT: [20, 4, 77],
    AMZN: [243, 186, 47],
    NVDA: [56, 58, 104],
    GOOG: [0, 100, 155],
    GOOGL: [0, 51, 173],
    TSLA: [232, 65, 66],
    BFOCX: [225, 179, 3],
    META: [230, 0, 122],
    JPFAX: [235, 0, 41],
    VISAX: [130, 71, 229],
    COST: [255, 164, 9],
    PEP: [52, 93, 157],
    COKE: [20, 182, 231],
    ADBE: [255, 102, 0],
    NFLX: [255, 164, 9],
    INTC: [52, 93, 157],
    AMD: [20, 182, 231],
    LEGO: [255, 102, 0],
    MNST: [255, 164, 9]
  };



  const labels = Array.from(new Set(assets.map((asset) => asset.symbol))); 
  const dataValues = labels.map((symbol) =>
    assets
      .filter((asset) => asset.symbol === symbol)
      .reduce((sum, asset) => sum + parseFloat(asset.quantity * asset.price), 0)
  );

  const image = new Image();
  image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl4xKQTu98mXrfdGuy4kpJMB9UwIrzro8ATKyflqRGFPMHbMRMVmA2ICIQdph_Uy9T4M&usqp=CAU'

  const plugin = {
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    },
  };


  const config = {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Stocks',
          data: dataValues,
          backgroundColor: labels.map(symbol => (
            stockColors[symbol] ? `rgba(${stockColors[symbol].join(',')})` : 'rgba(0,0,0,0)' 
          )),
          borderColor: labels.map(symbol => (
            stockColors[symbol] ? `rgba(${stockColors[symbol].join(',')},1)` : 'rgba(0,0,0,0)'  
          )),
          borderWidth: 4,
          hoverOffset: 4,
        },
      ],
    },
    plugins: [plugin],
  };

      
  
  return (
    <>
    {assets.length === 0 ? (
      <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white hover:ring-white-400 hover:border-4 hover:border-white-300 hover:scale-105 duration-300 ease-in-out">
        <span className="flex justify-center mb-1 font-bold text-lg">Stocks</span>
        <p className="text-center">No Assets</p>
      </div>
    ) : (
      <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white hover:ring-white-400 hover:border-4 hover:border-white-300 hover:scale-105 duration-300 ease-in-out">
        <span className="flex justify-center mb-1 font-bold text-lg">Stocks</span>
        {config ? <Pie {...config} /> : <Loading />}
      </div>
    )}
  </>
);
}

export default HomeStocks;