import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useState, useEffect, useMemo} from'react';
import { getUserForex } from '../../../lib/api';

ChartJS.register(ArcElement, Tooltip);


const HomeForex = () => {
  const user_id = document.cookie.split("user_id=")[1];
  const [assets, setAssets] = useState([]);

  const fetchAssetsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserForex(user_id);
      setAssets(response.user_forex);
      console.log('Currency Transaction Resp', response)
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [user_id]);
  
  useEffect(() => {
    fetchAssetsMemoized();
  }, [user_id]);

  const forexColors = {
    PHP: [247, 147, 26],
    EUR: [20, 4, 77],
    JPY: [243, 186, 47],
    GBP: [56, 58, 104],
    AUD: [0, 100, 155],
    CAD: [0, 51, 173],
    CHF: [232, 65, 66],
    CNY: [225, 179, 3],
    SEK: [230, 0, 122],
    MXN: [235, 0, 41],
    NZD: [130, 71, 229],
    SGD: [255, 164, 9],
    HKD: [52, 93, 157],
    NOK: [20, 182, 231],
    KRW: [255, 102, 0],
    TRY: [255, 164, 9],
    INR: [52, 93, 157],
    RUB: [20, 182, 231],
    BRL: [255, 102, 0],
    ZAR: [255, 164, 9],
    DKK: [52, 93, 157],
    TWD: [20, 182, 231],
    PLN: [255, 102, 0],
    THB: [255, 164, 9],
    MYR: [52, 93, 157]
  };



  const labels = Array.from(new Set(assets.map((asset) => asset.symbol))); 
  const dataValues = labels.map((symbol) =>
    assets
      .filter((asset) => asset.symbol === symbol)
      .reduce((sum, asset) => sum + parseFloat(asset.quantity * asset.price), 0)
  );

  const image = new Image();
  image.src = 'data:image/jpeg;base64,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'

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
          label: 'Currency',
          data: dataValues,
          backgroundColor: labels.map(symbol => (
            forexColors[symbol] ? `rgba(${forexColors[symbol].join(',')})` : 'rgba(0,0,0,0)' 
          )),
          borderColor: labels.map(symbol => (
            forexColors[symbol] ? `rgba(${forexColors[symbol].join(',')},1)` : 'rgba(0,0,0,0)'  
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
      <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white">
        <span className="flex justify-center mb-1 font-bold text-lg">Currencies</span>
        <p className="text-center">No Assets</p>
      </div>
    ) : (
      <div className="flex-1 shadow-md rounded-md px-10 py-7 my-2 bg-white">
        <span className="flex justify-center mb-1 font-bold text-lg">Currencies</span>
        <Pie {...config} />
      </div>
    )}
  </>
);
}

export default HomeForex;