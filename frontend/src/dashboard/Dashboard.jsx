import DashboardLayout from "./DashboardLayout";
import { Routes, Route } from 'react-router-dom';
import DashboardHome from "./home/DashboardHome";
import BuyStocksLayout from "./pages/stocks/BuyStocksLayout";
import MarketStocks from "./pages/stocks/MarketStocks";
import BuyCryptoLayout from "./pages/crypto/BuyCryptoLayout";
import MarketCrypto from "./pages/crypto/MarketCrypto";
import BuyForexLayout from "./pages/forex/BuyForexLayout";
import MarketForex from "./pages/forex/MarketForex";
import TransactionHistory from "./pages/others/TransactionHistory";
import Support from "./pages/others/Support";
import axios from "axios";
import { useEffect } from "react"; import MyProfile from "./Myprofile";

// eslint-disable-next-line react/prop-types
const Dashboard = ({ addAlert }) => {

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
                    <Route path="stocks" element={<BuyStocksLayout addAlert={addAlert} />} />
                    <Route path="stocks/market" element={<MarketStocks />} />
                    <Route path="crypto" element={<BuyCryptoLayout />} />
                    <Route path="crypto/market" element={<MarketCrypto />} />
                    <Route path="forex" element={<BuyForexLayout />} />
                    <Route path="forex/market" element={<MarketForex />} />
                    <Route path="transactions" element={<TransactionHistory />} />
                    <Route path="support" element={<Support />} />
                    <Route path="myprofile" element={<MyProfile />} />
                </Routes>
            </DashboardLayout>
        </>

    )
}

export default Dashboard;