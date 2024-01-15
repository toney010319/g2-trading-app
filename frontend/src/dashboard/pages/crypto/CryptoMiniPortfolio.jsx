import { useState, useMemo, useEffect } from "react";
import { getUserCrypto } from "../../../lib/api";
import SellCrypto from "./modals/SellCrypto";
import Loading from "../../../components/Loading";

const CryptoMiniPortfolio = ({ updateTransactionHistory, setUpdateTransactionHistory, setUpdateBalanceFlag }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const transactionsPerPage = 4;
  
  const fetchTransactionsMemoized = useMemo(() => async () => {
    try {
      const response = await getUserCrypto(user_id);
      setTransactions(response);
      setLoading(false);
      console.log('Crypto Transaction Resp', response)
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  }, [user_id]);

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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const openModal = (assetSymbol) => {
    setSelectedAsset(assetSymbol);
  };

  const closeModal = () => {
    setSelectedAsset(null);
    setUpdateTransactionHistory(true);
    setUpdateBalanceFlag(true);
  };

    
    const filteredAndGroupedTransactions = useMemo(() => {
      const userCrypto = transactions.user_crypto || [];
      const buyTransactions = userCrypto.filter((transaction) => transaction.transaction_type === 'buy');
      const sellTransactions = userCrypto.filter((transaction) => transaction.transaction_type === 'sell');
      const pairedTransactions = [];
  
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
      const unpairedBuyTransactions = buyTransactions.filter(
        (buyTransaction) => !pairedTransactions.includes(buyTransaction)
      );
      const groupedTransactions = unpairedBuyTransactions.reduce((result, transaction) => {
      const existingTransaction = result.find((t) => t.symbol === transaction.symbol);
    
        if (existingTransaction) {
          existingTransaction.quantity += parseFloat(transaction.quantity);
        } else {
          result.push({
            symbol: transaction.symbol,
            quantity: parseFloat(transaction.quantity),
            price: parseFloat(transaction.price),
          });
        }
    
        return result;
      }, []);
    
      return groupedTransactions;
    }, [transactions.user_crypto]);

    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginatedTransactions = filteredAndGroupedTransactions.slice(startIndex, endIndex);

  useEffect(() => {
    fetchTransactionsMemoized();  
    if (updateTransactionHistory) {
      fetchTransactionsMemoized(); 
      setUpdateTransactionHistory(false);
    }
  }, [updateTransactionHistory, fetchTransactionsMemoized, setUpdateTransactionHistory]);


  return (
    <>
    {selectedAsset && (
        <SellCrypto
          handleClose={closeModal}
          addAlert={() => {}}
          selectedAsset={selectedAsset}
          setUpdateBalanceFlag={setUpdateBalanceFlag}
        />
      )}

    <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
      <section className="container mx-auto p-2 font-mono">
        <div>
          <div className="flex justify-center">
            <span className="flex w-full justify-center text-bold text-2xl font-sans underline underline-offset-4 font-bold mb-2">
              Crypto Assets
            </span>
          </div>
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
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
                ) : (
                  paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((userCrypto) => (
                      <tr className="cursor-pointer hover:border-azure-950 hover:border-4 hover:scale-105" key={userCrypto.id} onClick={() => openModal(userCrypto.symbol)}>
                        <td className="px-4 py-3">
                          <div className="flex">
                            <div className="flex">
                              <img className="ml-2 w-8" src={getImageLink(userCrypto.symbol)} alt={userCrypto.symbol} />
                            </div>
                            <span className="ml-2">{userCrypto.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{parseFloat(userCrypto.quantity).toFixed(0)}</td>
                        <td className="px-4 py-3 text-center">$ {parseFloat((userCrypto.price)*(userCrypto.quantity)).toFixed(2)}</td>
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
                  )
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleNextPage}
                  disabled={endIndex >= filteredAndGroupedTransactions.length}
                >
                  Next
                </button>
              </div>
          </div>
        </div>
      </section>
    </div>
  </>
);
};

export default CryptoMiniPortfolio;
