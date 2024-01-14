import { useState, useEffect, useMemo } from "react";
import { getUserCrypto, sellCrypto } from "../../../../lib/api";
import Loading from "../../../../components/Loading";


// eslint-disable-next-line react/prop-types
const SellCrypto = ({handleClose, selectedAsset, setUpdateBalanceFlag}) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;

  const fetchUserCryptoMemoized = useMemo(
    () => async () => {
      try {
        const response = await getUserCrypto(user_id);
        console.log('Forex Transaction Resp', response);
        setTransactions(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching transactions:', error);
      }
    },
    [user_id, selectedAsset]
  );

  const handleSellCrypto = async (userForex) => {
    try {
      const { quantity, price, symbol } = userForex;
      if (quantity === undefined || price === undefined || symbol === undefined) {
        console.error('Invalid userForex format');
        return;
      }
      const sellResponse = await sellCrypto({
        user_id,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        symbol: symbol,
      });
      console.log('Sell Response:', sellResponse);
      handleClose(close);
      fetchUserCryptoMemoized();
      setUpdateBalanceFlag(true);
    } catch (error) {
      console.error('Error selling forex:', error);
    }
  };
      

  const getImageLink = (symbol) => {
    switch (symbol) {
      case 'BTC':
        return 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029';
      case 'ETH':
        return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029';
      case 'BNB':
        return 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029';
      case 'SOL':
        return 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029';
      case 'XRP':
        return 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029'; 
      case 'ADA':
        return 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029';   
      case 'AVAX':
        return 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029';  
      case 'DOGE':
        return 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029'; 
      case 'DOT':
        return 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029'; 
      case 'TRX':
        return 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029';  
      case 'MATIC':
        return 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029';  
      case 'SHIB':
        return 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=029';  
      case 'LTC':
        return 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=029';  
      case 'XLM':
        return 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=029';  
      case 'XMR':
        return 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=029';  
      }
    };

  useEffect(() => {
    fetchUserCryptoMemoized()
  }, [user_id])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredAndGroupedTransactions = useMemo(() => {
    const userCrypto = transactions.user_crypto || [];
    const buyTransactions = userCrypto.filter((transaction) => transaction.transaction_type === 'buy');
    const sellTransactions = userCrypto.filter((transaction) => transaction.transaction_type === 'sell');
    const pairedTransactions = [];
    const filteredBuyTransactions = buyTransactions.filter((buyTransaction) =>
      buyTransaction.symbol === selectedAsset && parseFloat(buyTransaction.quantity) > 0
    );
  
    for (const buyTransaction of buyTransactions) {
      const correspondingSell = sellTransactions.find(
        (sellTransaction) =>
          sellTransaction.symbol === buyTransaction.symbol &&
          sellTransaction.quantity === buyTransaction.quantity &&
          sellTransaction.price === buyTransaction.price &&
          !pairedTransactions.includes(sellTransaction)
      );
  
      if (correspondingSell) {
        pairedTransactions.push(buyTransaction, correspondingSell);
      }
    }
  
    const unpairedBuyTransactions = filteredBuyTransactions.filter(
      (buyTransaction) => !pairedTransactions.includes(buyTransaction)
    );
  
    const groupedTransactions = unpairedBuyTransactions.reduce((result, transaction) => {
      const existingGroup = result.find(
        (group) =>
          group.symbol === transaction.symbol && group.quantity === transaction.quantity && group.price === transaction.price
      );
  
      if (existingGroup) {
        existingGroup.quantity += parseFloat(transaction.quantity);
      } else {
        result.push({
          symbol: transaction.symbol,
          quantity: parseFloat(transaction.quantity),
          price: parseFloat(transaction.price)
        });
      }
  
      return result;
    }, []);
  
    return groupedTransactions;
  }, [transactions.user_crypto, selectedAsset]);

      const startIndex = (currentPage - 1) * transactionsPerPage;
      const endIndex = startIndex + transactionsPerPage;
      const paginatedTransactions = filteredAndGroupedTransactions.slice(startIndex, endIndex);
   

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          </div>
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="w-full overflow-x-auto">
            <div className="flex justify-center">
              <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
                Crypto Assets
              </span>
            </div>
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Number</th>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center w-full h-10">
                          <Loading />
                        </div>
                      </td>
                    </tr>
                  ) : paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((userCrypto, index) => (
                      <tr key={userCrypto.id}>
                        <td className="px-4 py-3 text-center">
                          {index + 1 + (currentPage - 1) * transactionsPerPage}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex">
                            <div className="flex">
                              <img
                                className="w-12 inline-flex rounded-full"
                                src={getImageLink(userCrypto.symbol)}
                                alt={userCrypto.symbol}
                              />
                            </div>
                            <span className="flex">{userCrypto.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {parseFloat(userCrypto.quantity).toFixed(0)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userCrypto.price).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                          $ {parseFloat(userCrypto.price * userCrypto.quantity).toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-center">
                          
                          <button 
                          onClick={() => handleSellCrypto(userCrypto)}
                          className="p-2 px-5 text-white font-bold bg-azure-500 hover:bg-azure-700 rounded-md"
                          >Sell
                          </button>
                        </td>


                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center w-full h-10">
                          No Assets
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center w-full  mt-4 mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleNextPage}
                >
                  Next
                </button>
                <button
                  className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default SellCrypto;