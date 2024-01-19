import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getUserCrypto } from '../../../lib/api';
import { useState, useEffect, useMemo } from 'react';
import Loading from '../../../components/Loading';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip);


const HomeCrypto = () => {
  const user_id = document.cookie.split("user_id=")[1];
  const [assets, setAssets] = useState([]);

  const fetchAssetsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserCrypto(user_id);
      setAssets(response.user_crypto);

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


  const cryptoColors = {
    BTC: [247, 147, 26],
    ETH: [20, 4, 77],
    BNB: [243, 186, 47],
    SOL: [56, 58, 104],
    XRP: [0, 100, 155],
    ADA: [0, 51, 173],
    AVAX: [232, 65, 66],
    DOGE: [225, 179, 3],
    DOT: [230, 0, 122],
    TRX: [235, 0, 41],
    MATIC: [130, 71, 229],
    SHIB: [255, 164, 9],
    LTC: [52, 93, 157],
    XLM: [20, 182, 231],
    XMR: [255, 102, 0],
  };


  const labels = Array.from(new Set(assets.map((asset) => asset.symbol)));
  const dataValues = labels.map((symbol) =>
    assets
      .filter((asset) => asset.symbol === symbol)
      .reduce((sum, asset) => sum + parseFloat(asset.quantity * asset.price), 0)
  );

  const image = new Image();
  image.src = 'data:image/png;base64,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';

  const plugin = {
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
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
          label: 'Crypto',
          data: dataValues,
          backgroundColor: labels.map(symbol => (
            cryptoColors[symbol] ? `rgba(${cryptoColors[symbol].join(',')})` : 'rgba(0,0,0,0)'
          )),
          borderColor: labels.map(symbol => (
            cryptoColors[symbol] ? `rgba(${cryptoColors[symbol].join(',')},1)` : 'rgba(0,0,0,0)'
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
        <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
          <span className="flex justify-center mb-1 font-bold text-lg">Cryptocurrency</span>
          <p className="text-center">No Assets</p>
        </div>
      ) : (
        <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
          <span className="flex justify-center mb-1 font-bold text-lg">Cryptocurrency</span>
          {config ? <Pie {...config} /> : <Loading />}
        </div>
      )}
    </>
  );
}

export default HomeCrypto;