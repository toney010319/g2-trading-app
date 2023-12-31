import DashboardLayout from "./DashboardLayout";
import Portfolio from "./pages/portfolio/Portfolio";
import {Routes, Route } from 'react-router-dom';
import DashboardHome from "./home/DashboardHome";
import FolioNews from "./pages/portfolio/FolioNews";
import FolioPerformance from "./pages/portfolio/FolioPerformance";
import FolioCrypto from "./pages/portfolio/FolioCrypto";
import FolioStocks from "./pages/portfolio/FolioStocks";
import FolioForex from "./pages/portfolio/FolioForex";
import Stocks from "./pages/stocks/Stocks";
import BuyStocks from "./pages/stocks/BuyStocks";
import MarketStocks from "./pages/stocks/MarketStocks";
import Crypto from "./pages/crypto/Crypto";
import BuyCrypto from "./pages/crypto/BuyCrypto";
import MarketCrypto from "./pages/crypto/MarketCrypto";
import Forex from "./pages/forex/Forex";
import BuyForex from "./pages/forex/BuyForex";
import MarketForex from "./pages/forex/MarketForex";
import TransactionHistory from "./pages/others/TransactionHistory";
import Referrals from "./pages/others/Referrals";
import Support from "./pages/others/Support";
import axios from "axios";
import { useEffect } from "react";import MyProfile from "./Myprofile";

// eslint-disable-next-line react/prop-types
const Dashboard = ({addAlert}) => {

    useEffect(() => {
        const initiateAuthorization = () => {
          const token = document.cookie.split('token=')[1];
          if (token) {
            axios.defaults.headers.common['Authorization'] = token;
          }
        };
        initiateAuthorization();
      }, []);
    return (

    <>
    <DashboardLayout addAlert={addAlert}>
        <Routes>
            <Route path="/" element={<DashboardHome />} />
                <Route path="portfolio" element={<Portfolio />} />
                    <Route path="portfolio/news" element={<FolioNews />} />
                    <Route path="portfolio/performance" element={<FolioPerformance />} />
                    <Route path="portfolio/crypto" element={<FolioCrypto />} />
                    <Route path="portfolio/stocks" element={<FolioStocks />} />
                    <Route path="portfolio/forex" element={<FolioForex />} />
                <Route path="stocks" element={<Stocks />} />
                    <Route path="stocks/trade" element={<BuyStocks />} />
                    <Route path="stocks/market" element={<MarketStocks />} />
                <Route path="crypto" element={<Crypto />} />
                    <Route path="crypto/trade" element={<BuyCrypto />} />
                    <Route path="crypto/market" element={<MarketCrypto />} />
                <Route path="forex" element={<Forex />} />
                    <Route path="forex/trade" element={<BuyForex />} />
                    <Route path="forex/market" element={<MarketForex />} />
                <Route path="transactions" element={<TransactionHistory/>} />
                <Route path="referrals" element={<Referrals />} />
                <Route path="support" element={<Support />} />
                <Route path="myprofile" element={<MyProfile />} />
        </Routes>
    </DashboardLayout>
    </>
    
    )
}

export default Dashboard;