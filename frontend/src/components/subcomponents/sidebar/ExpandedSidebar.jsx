import Logo from '../../../assets/Logo';
import { Link } from 'react-router-dom';
import { getProfile } from '../../../lib/api';
import { useState, useEffect } from 'react';
import Loading from '../../Loading';
// eslint-disable-next-line react/prop-types
const ExpandedSidebar = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = document.cookie.split('user_id=')[1];

  const fetchProfile = async () => {
    let response = await getProfile(user_id)
    setProfile(response)
    setLoading(false)
    return response
  }
  
  useEffect(() => {
  fetchProfile()
  },[])

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
                {loading? (
                    <div className="flex ml-8 w-16">
                      <Loading />
                    </div>
                
                  ) : (
                    <>
                      <p className="cursor-pointer text-sm leading-5 text-white">
                        {profile.first_name} {profile.last_name}
                      </p>
                      <p className="cursor-pointer text-xs leading-3 text-gray-300">
                        {profile.email}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <img
                  className="text-center item-center cursor-pointer mt-1"
                  src="https://www.svgrepo.com/show/506315/settings.svg"
                  width="30"
                  alt="Gear"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default ExpandedSidebar;