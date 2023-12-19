import { useState } from 'react';

const Sidebar = () => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-gradient-to-b from-azure-400 to-azure-900 h-full p-3 ${expanded ? 'w-60' : 'w-20'} duration-300 relative rounded-tr-lg rounded-br-lg`}>
    
      <button 
        className="ml-1 bg-azure-300 p-2 rounded-full absolute -left-3 top-1/2 -translate-y-1/2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '<' : '>'}
      </button>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          
          {expanded && (
            <div className="flex flex-row justify-center mb-5 ease-in-out duration-300">
              <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="50" alt="Icon Svg Stock Exchange" />
              
              <div className="flex flex-col relative z-5">
                <span className="font-bold text-3xl">Stellar</span>
                <sub className="text-md ml-10">Markets</sub>
              </div>
            </div>  
          )}
          
          {!expanded && (
            <div className="flex justify-center ease-in-out duration-300">
              <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="50" alt="Icon Svg Stock Exchange" />
            </div>
          )}
        <span className="mt-1 border border-black"></span>
        </div>

        <div>
          <div>Buy</div>
          <div>Market</div>
          <div>Trade</div>
        </div>

      </div>

    </div>
  );

};

export default Sidebar;