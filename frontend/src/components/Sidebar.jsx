import { useState } from 'react';
const Sidebar = () => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-gradient-to-b from-azure-400 to-azure-900 h-full p-3 ${expanded ? 'w-60' : 'w-20'} duration-300 relative rounded-br-lg`}>
    
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
        


        <div className="mt-1 mb-1">
          <div className="flex flex-row">
            <img src="https://www.svgrepo.com/show/502602/dashboard-1.svg" 
            width="30" 
            alt="Home" />
            <span className="ml-2 font-bold text-lg">Dashboard</span>
          </div>
          
        </div>  
        
      
        
        <div className="mt-1">
          <div className="flex flex-row">
            <img src="https://www.svgrepo.com/show/189071/files-folder.svg" 
              width="30" 
              alt="Home" />
            <span className="font-bold text-lg ml-2">Portoflio</span>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/374991/news.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">News</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/483055/performance-up-graph.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Performance</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/488803/bitcoin-1.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Cryptocurrency</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/141143/stocks-graphic-in-a-circle.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Stocks</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/437676/fx.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Forex</div>
          </div>
        </div>

        <span className="mt-1 border border-black"></span>

        <div className="mt-1">
          <div className="flex flex-row">
            <img src="https://www.svgrepo.com/show/504920/stock-ticker.svg" 
              width="30" 
              alt="Home" />
            <span className="font-bold text-lg ml-2">Stock Market</span>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/301267/monitor-tv.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Buy/Sell</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/483083/stock-market.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">View Market</div>
          </div>       
        </div>
        
        <span className="mt-1 border border-black"></span>

        <div className="mt-1">
          <div className="flex flex-row">
            <img src="https://www.svgrepo.com/show/488803/bitcoin-1.svg" 
              width="30" 
              alt="Home" />
            <span className="font-bold text-lg ml-2">Cryptocurrency</span>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/416781/buy-coin-cryptocurrency.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Buy/Sell</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/487223/coin-2.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">View Market</div>
          </div>       
        </div>

        <span className="mt-1 border border-black"></span>

        <div className="mt-1">
         <div className="flex flex-row">
            <img src="https://www.svgrepo.com/show/437676/fx.svg" 
              width="30" 
              alt="Home" />
            <span className="font-bold text-lg ml-2">Forex</span>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/483228/dollar-and-yen-exchange-rate.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Buy/Sell</div>
          </div>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/482978/dollar-money.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">View Market</div>
          </div>       
        </div>

        <span className="mt-1 border border-black"></span>

        <div className="mt-1">
          <span className="font-bold text-lg">Others</span>

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/470441/transactions.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Transaction History</div>
          </div>       

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/453989/partner.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Referrals</div>
          </div>       

          <div className="flex flex-row ml-3">
            <img src="https://www.svgrepo.com/show/355287/support.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Support</div>
          </div>       
        </div>
        
        </div>

       

        <div>
          <div className=" flex justify-between items-center w-full">
          {expanded && (
            <div className="flex flex-row justify-between w-full">
              <div className="flex justify-center items-center  space-x-2">
                <div>
                  <img 
                  className="rounded-full" 
                  src="https://www.svgrepo.com/show/419535/profile-about-mobile-ui.svg"
                  width="35" 
                  alt="avatar" />
                </div>
                <div className="flex justify-start flex-col items-start">
                  <p className="cursor-pointer text-sm leading-5 text-white">DB Name</p>
                  <p className="cursor-pointer text-xs leading-3 text-gray-300">DB Email</p>
                </div>
              </div>
              <div>
                <img
                className="text-center item-center cursor-pointer mt-1" 
                src="https://www.svgrepo.com/show/506315/settings.svg" 
                width="30" 
                alt="Gear" />
              </div>
            </div>
          )}

            {!expanded && (
              <div className="flex justify-center ease-in-out duration-300 ml-2">
                <img 
                src="https://www.svgrepo.com/show/419535/profile-about-mobile-ui.svg" 
                width="35" 
                alt="Icon Svg Stock Exchange" />
              </div>
            )}
          </div>
        </div>

      </div>
            
    </div>
  );

};

export default Sidebar;