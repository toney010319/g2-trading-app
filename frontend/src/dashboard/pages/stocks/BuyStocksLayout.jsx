import BuyStocksMarket from "./subcomponents/BuyStocksMarket";
import TransferStocks from "./TransferStocks";
import BuyStocks from "./BuyStocks";

const BuyStocksLayout = () => {

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="flex">
          <TransferStocks />
        </div>

        <div className="flex">
          <BuyStocksMarket />
        </div>
      </div>

      <div className="flex p-4">
        <BuyStocks />
      </div>
    </>
  );
};

export default BuyStocksLayout;
