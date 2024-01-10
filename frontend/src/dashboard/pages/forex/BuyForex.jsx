import { useState } from "react";
const BuyForex = () => {
    const [walletBalance, setWalletBalance] = useState(); 
    const [forexBalance, setforexBalance] = useState(0);
    const [transferAmount, setTransferAmount] = useState('');
    const [selectedCurrency, setselectedCurrency] = useState('');
    const [currencyValue, setcurrencyValue] = useState('');
  
    const handleTransferToForex = () => {
      console.log('Transfer from wallet to forex wallet:', transferAmount, selectedCurrency);
    };
  
    const handleTransferToWallet = () => {
      console.log('Transfer from stock to wallet:', transferAmount, selectedCurrency);
    };
  
  
    const forexOptions = ['A', 'B', 'C'];
  
    return (
      <>
        <div className="flex-1 flex-row bg-red-200">
          <div className="bg-yellow-200">
            <div className="bg-green-200 rounded-md m-3">
              <div>Your Wallet</div>
              <div>Balance: ${walletBalance}</div>
            </div>
            <div className="m-3">
              <label htmlFor="transferAmount">Transfer Amount:</label>
              <input
                type="text"
                id="transferAmount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <br />
              <button onClick={handleTransferToForex}>Transfer to Forex Wallet</button>
            </div>
          </div>
  
          <div className="bg-blue-200 rounded-md">
            <div className="bg-green-200 rounded-md m-3">
              <div>Your Forex Trading Wallet</div>
              <div>Balance: ${forexBalance}</div>
            </div>
            <div className="m-3">
              <label htmlFor="transferAmount">Transfer Amount:</label>
              <input
                type="text"
                id="transferAmount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <br />
              <label htmlFor="selectedCurrency">Select Currency:</label>
              <select
                id="selectedCurrency"
                value={selectedCurrency}
                onChange={(e) => {
                  setselectedCurrency(e.target.value);
                }}
              >
                <option value="">Choose currency</option>
                {forexOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="currencyValue">Currency Value:</label>
              <div>{currencyValue}</div>
              <br />
              <button onClick={handleTransferToWallet}>Transfer to Wallet</button>
            </div>
          </div>
        </div>
      </>
    );
}

export default BuyForex;