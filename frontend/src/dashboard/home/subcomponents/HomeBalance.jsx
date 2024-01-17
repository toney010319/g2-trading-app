import { useState, useEffect, useMemo } from "react";
import { getUserAssets, getUserBalance } from "../../../lib/api";
import axios from "axios";

const HomeBalance = () => {
    const user_id = document.cookie.split("user_id=")[1];
    const [balance, setBalance] = useState(0);
    const [assets, setAssets] = useState([]);
    
    const fetchBalanceMemoized = useMemo(() => async () => {
        try {
          const response = await getUserBalance(user_id);
          setBalance(response);
          console.log(response)
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
    }, [user_id]);

    const fetchUserAssetsMemoized = useMemo(() => async () => {
        try {
          const response = await getUserAssets(user_id);
          setAssets(response);
          console.log('Assets response', response)
        } catch (error) {
          console.error('Error fetching balance:', error);
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
        fetchBalanceMemoized()
        fetchUserAssetsMemoized()
      }, [fetchBalanceMemoized, fetchUserAssetsMemoized]);

    const totalStocksBalance = assets
    .filter(asset => asset.asset_type === 'Stock')
    .reduce((total, stock) => total + parseFloat(stock.quantity) * parseFloat(stock.price), 0);

    const totalCryptoBalance = assets
        .filter(asset => asset.asset_type === 'Cryptocurrency')
        .reduce((total, crypto) => total + parseFloat(crypto.quantity) * parseFloat(crypto.price), 0);

    const totalForexBalance = assets
        .filter(asset => asset.asset_type === 'Currency')
        .reduce((total, forex) => total + parseFloat(forex.quantity) * parseFloat(forex.price), 0);

    

return (
    <>
        <div className="mx-2 bg-white rounded-md shadow-md hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
            <h1 className="text-center font-bold py-2">WALLET BALANCES</h1>
            <table className="min-w-full border border-collapse">
            <tbody>
                <tr className="border p-2">
                <td className="border font-semibold p-2">PHP Wallet Balance</td>
                <td className="text-right border p-2">₱{parseFloat(balance.balance).toFixed(2)}</td>
                </tr>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Stock USD Wallet</td>
                <td className="text-right border p-2">${parseFloat(balance.stocks).toFixed(2)}</td>
                </tr>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Crypto Spot Wallet</td>
                <td className="text-right border p-2">${parseFloat(balance.crypto).toFixed(2)}</td>
                </tr>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Forex Trading Wallet</td>
                <td className="text-right border p-2">${parseFloat(balance.forex).toFixed(2)}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="m-2 bg-white rounded-md shadow-m hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
            <h1 className="text-center font-bold py-2">RUNNING BALANCES</h1>
            <table className="min-w-full border border-collapse">
            <tbody>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Total Stock Balances</td>
                <td className="text-right border p-2">${totalStocksBalance.toFixed(2)}</td>
                </tr>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Total Crypto Balances</td>
                <td className="text-right border p-2">${totalCryptoBalance.toFixed(2)}</td>
                </tr>
                <tr className="border p-2">
                <td className="border font-semibold p-2">Total Forex Balances</td>
                <td className="text-right border p-2">${totalForexBalance.toFixed(2)}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </>
)
}

export default HomeBalance;