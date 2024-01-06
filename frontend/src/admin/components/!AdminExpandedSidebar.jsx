import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const NotAdminExpandedSidebar = () => {

  return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex justify-center ease-in-out duration-300">
            <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="50" alt="Icon Svg Stock Exchange" />
          </div>
        <span className="mt-1 border border-black"></span> 
        


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
            <Link to="portfolio">
              <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
                <img src="https://www.svgrepo.com/show/189071/files-folder.svg" 
                  width="40" 
                  alt="Portfolio" />
              </div>
            </Link>
        </section>

        <span className="mt-1 border border-black"></span>

        <section className="mt-1">
          <Link to="stocks">
            <div className="flex flex-row justify-center hover:border-b-4 hover:scale-105 ease-in-out duration-100 border-black">
              <img src="https://www.svgrepo.com/show/504920/stock-ticker.svg" 
                width="40" 
                alt="Stocks" />
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

         
        </section>

        <span className="mt-1 border border-black "></span>

       
        
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

export default NotAdminExpandedSidebar;