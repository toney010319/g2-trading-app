import Logo from '../../../assets/logo';
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const ExpandedSidebar = () => {

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
            <Logo />
        <span className="mt-1 border border-black"></span> 
        
        <div className="mt-1 mb-1">
          <Link to="/dashboard">
            <div className="flex flex-row hover:underline underline-offset-4">
              <img src="https://www.svgrepo.com/show/502602/dashboard-1.svg" 
              width="30" 
              alt="Home" />
              <span className="ml-2 font-bold text-lg">Dashboard</span>
            </div>
          </Link>
        </div>  
        
      
        
        <section className="mt-1">
            <Link to="portfolio">
              <div className="flex flex-row hover:underline underline-offset-4">
                <img src="https://www.svgrepo.com/show/189071/files-folder.svg" 
                  width="30" 
                  alt="Portfolio" />
                <span className="font-bold text-lg ml-2">Portoflio</span>
              </div>
            </Link>
          
            <Link to="portfolio/news">
              <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/374991/news.svg" 
                width="20" 
                alt="News" />
                <span className="ml-1">News</span>
              </div>
            </Link>

            <Link to="portfolio/performance">
              <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4 ">
                <img src="https://www.svgrepo.com/show/483055/performance-up-graph.svg" 
                  width="20" 
                  alt="Performance" />
                <div className="ml-1">Performance</div>
              </div>
            </Link>

            <Link to="portfolio/crypto">
              <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
                <img src="https://www.svgrepo.com/show/488803/bitcoin-1.svg" 
                  width="20" 
                  alt="Crypto" />
                <div className="ml-1">Cryptocurrency</div>
              </div>
            </Link>

            <Link to="portfolio/stocks">
              <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
                <img src="https://www.svgrepo.com/show/141143/stocks-graphic-in-a-circle.svg" 
                  width="20" 
                  alt="Stocks" />
                <div className="ml-1">Stocks</div>
              </div>
            </Link>

            <Link to="portfolio/forex">
              <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
                <img src="https://www.svgrepo.com/show/437676/fx.svg" 
                  width="20" 
                  alt="Forex" />
                <div className="ml-1">Forex</div>
              </div>
            </Link>
        </section>

        <span className="mt-1 border border-black"></span>

        <section className="mt-1">
          <Link to="stocks">
            <div className="flex flex-row hover:underline underline-offset-4">
              <img src="https://www.svgrepo.com/show/504920/stock-ticker.svg" 
                width="30" 
                alt="Stocks" />
              <span className="font-bold text-lg ml-2">Stock Market</span>
            </div>
          </Link>

          <Link to="stocks/trade">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/301267/monitor-tv.svg" 
                width="20" 
                alt="Trade" />
              <div className="ml-1">Buy/Sell</div>
            </div>
          </Link>

          <Link to="stocks/market">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/483083/stock-market.svg" 
                width="20" 
                alt="Stock Market" />
              <div className="ml-1">View Market</div>
            </div>
          </Link>       
        </section>
        
        <span className="mt-1 border border-black hover:underline underline-offset-4"></span>

        <section className="mt-1">

        <Link to="crypto">
          <div className="flex flex-row hover:underline underline-offset-4">
            <img src="https://www.svgrepo.com/show/488803/bitcoin-1.svg" 
              width="30" 
              alt="Crypto" />
            <span className="font-bold text-lg ml-2">Cryptocurrency</span>
          </div>
        </Link>

        <Link to="crypto/trade">
          <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
            <img src="https://www.svgrepo.com/show/416781/buy-coin-cryptocurrency.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">Buy/Sell</div>
          </div>
        </Link>

        <Link to="crypto/market">
          <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
            <img src="https://www.svgrepo.com/show/487223/coin-2.svg" 
              width="20" 
              alt="Home" />
            <div className="ml-1">View Market</div>
          </div>       
        </Link>
        </section>

        <span className="mt-1 border border-black"></span>

        
        <section className="mt-1">
          <Link to="forex">
            <div className="flex flex-row hover:underline underline-offset-4">
              <img src="https://www.svgrepo.com/show/437676/fx.svg" 
                width="30" 
                alt="Home" />
              <span className="font-bold text-lg ml-2">Forex</span>
            </div>
          </Link>

          <Link to="forex/trade">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/483228/dollar-and-yen-exchange-rate.svg" 
                width="20" 
                alt="Home" />
              <div className="ml-1">Buy/Sell</div>
            </div>
          </Link>

          <Link to="forex/market">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/482978/dollar-money.svg" 
                width="20" 
                alt="Home" />
              <div className="ml-1">View Market</div>
            </div>
          </Link>       
        </section>

        <span className="mt-1 border border-black "></span>

        <section className="mt-1">
          <span className="font-bold text-lg">Others</span>

          <Link to="transactions">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/470441/transactions.svg" 
                width="20" 
                alt="Home" />
              <div className="ml-1">Transaction History</div>
            </div>
          </Link>       

          <Link to="referrals">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/453989/partner.svg" 
                width="20" 
                alt="Home" />
              <div className="ml-1">Referrals</div>
            </div>
          </Link>       

          <Link to="support">
            <div className="flex flex-row ml-3 hover:underline hover:font-bold underline-offset-4">
              <img src="https://www.svgrepo.com/show/355287/support.svg" 
                width="20" 
                alt="Home" />
              <div className="ml-1">Support</div>
            </div>
          </Link>       
        </section>
        
        </div>

       

        <div>
          <div className=" flex justify-between items-center w-full">
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
          </div>
        </div>
      </div>
    </>
  );

};

export default ExpandedSidebar;