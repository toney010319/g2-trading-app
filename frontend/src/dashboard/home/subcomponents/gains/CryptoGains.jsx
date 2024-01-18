import { getCryptoList } from "../../../../lib/api";
import { useEffect, useMemo, useState } from "react";

const CryptoGains = () => {
  const user_id = document.cookie.split("user_id=")[1];
  const [cryptoList, setCryptoList] = useState([]);

  const fetchCryptoList = useMemo(
    () => async () => {
      try {
        const response = await getCryptoList(user_id);
        setCryptoList(response);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    [user_id]
  );

  useEffect(() => {
    fetchCryptoList();
  }, [fetchCryptoList]);

  const filteredCryptoList = cryptoList.filter(
    (crypto) => parseFloat(crypto.changes_percentage) !== 0
  );

  const sortedCryptoList = filteredCryptoList.sort(
    (a, b) => parseFloat(b.changes_percentage) - parseFloat(a.changes_percentage)
  );

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


  return (
    <>
      <div className="mx-2 bg-white rounded-md shadow-md hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-center font-bold mb-2">Top Crypto Gainers</h1>
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Rank</th>
              <th className="border p-2">Logo</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {sortedCryptoList.slice(0, 6).map((crypto, index) => (
              <tr key={index} className="border p-2">
                <td className="text-center border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img src={getImageLink(crypto.symbol)} alt={`${crypto.symbol} Logo`} width="30" height="60" />
                </td>
                <td className="border p-2">
                  <span className="font-bold text-sm">{crypto.name}</span>
                </td>
                <td className={`text-center border p-2 font-bold ${parseFloat(crypto.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}>
                  <div className="inline-flex items-center">
                    <span className={`mr-2 font-bold text-sm ${parseFloat(crypto.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {parseFloat(crypto.changes_percentage).toFixed(2)}%
                    </span>
                    {parseFloat(crypto.changes_percentage) < 0 ? (
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/640px-Red_Arrow_Down.svg.png" alt="Arrow Down" width="7" height="7" />
                    ) : (
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png?20190502180104" alt="Arrow Up" width="7" height="5" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-2 bg-white rounded-md shadow-md hover:ring-yellow-400 hover:border-4 hover:border-yellow-300 hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-center font-bold mb-2 ">Top Crypto Losers</h1>
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Rank</th>
              <th className="border p-2">Logo</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {sortedCryptoList.slice(-6).reverse().map((crypto, index) => (
              <tr key={index} className="border p-2">
                <td className="text-center border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img src={getImageLink(crypto.symbol)} alt={`${crypto.symbol} Logo`} width="30" height="60" />
                </td>
                <td className="border p-2">
                  <span className="font-bold text-sm">{crypto.name}</span>
                </td>
                <td className="text-center border p-2 font-bold text-lg">
                  <div className="inline-flex items-center">
                    <span className={`mr-2 font-bold text-sm ${parseFloat(crypto.changes_percentage) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {parseFloat(crypto.changes_percentage).toFixed(2)}%
                    </span>
                    {parseFloat(crypto.changes_percentage) < 0 ? (
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/640px-Red_Arrow_Down.svg.png" alt="Arrow Down" width="7" height="7" />
                    ) : (
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png?20190502180104" alt="Arrow Up" width="7" height="5" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CryptoGains;