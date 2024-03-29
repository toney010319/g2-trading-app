import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const NotExpandedSidebar = () => {

  return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex justify-center ease-in-out duration-300">
            <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="50" alt="Icon Svg Stock Exchange" />
          </div>
        <span className="mt-2 border border-black"></span> 
        


        <div className="mt-1 mb-1">
            <Link to="/dashboard">
              <div className="relative flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black ">
                <img src="https://www.svgrepo.com/show/502602/dashboard-1.svg" 
                width="40" 
                alt="Home" />
              </div>
            </Link>
        </div>  
        
        <span className="mt-1 border border-black "></span>
        

        <section className="mt-1">
          <Link to="stocks">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/504920/stock-ticker.svg" 
                width="40" 
                alt="Stocks" />
            </div>
          </Link>

          <Link to="stocks/market">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/483083/stock-market.svg" 
                width="35" 
                alt="Stock Market" />
            </div>
          </Link>       
        </section>
        
        <span className="mt-1 border border-black hover:underline underline-offset-4"></span>

        <section className="mt-1">

        <Link to="crypto">
          <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
            <img src="https://www.svgrepo.com/show/488803/bitcoin-1.svg" 
              width="40" 
              alt="Crypto" />
          </div>
        </Link>

        <Link to="crypto/market">
          <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
            <img src="https://www.svgrepo.com/show/487223/coin-2.svg" 
              width="35" 
              alt="Home" />
          </div>       
        </Link>
        </section>

        <span className="mt-1 border border-black"></span>

        
        <section className="mt-1">
          <Link to="forex">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/437676/fx.svg" 
                width="40" 
                alt="Home" />
            </div>
          </Link>

          <Link to="forex/market">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/482978/dollar-money.svg" 
                width="35" 
                alt="Home" />
            </div>
          </Link>       
        </section>

        <span className="mt-1 border border-black "></span>

        <section className="mt-1">
          <span className="font-bold text-lg">Others</span>

          <Link to="transactions">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/470441/transactions.svg" 
                width="40" 
                alt="Home" />
            </div>
          </Link>         

          <Link to="support">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/355287/support.svg" 
                width="35" 
                alt="Home" />
            </div>
          </Link>       
        </section>
        
        </div>

       

        <div>
          <div className=" flex justify-between items-center w-full">
            
  
              <div className="flex justify-center ease-in-out duration-200 ml-2 hover:scale-110 cursor-pointer">
                <img 
                src="https://www.svgrepo.com/show/419535/profile-about-mobile-ui.svg" 
                width="35" 
                alt="Icon Svg Stock Exchange" />
              </div>

          </div>
        </div>

      </div>
  );

};

export default NotExpandedSidebar;