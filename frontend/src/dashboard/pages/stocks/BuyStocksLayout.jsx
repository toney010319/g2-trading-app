import BuyStocksMarket from "./subcomponents/BuyStocksMarket";
import TransferStocks from "./TransferStocks";
import BuyStocks from "./BuyStocks";
import { useState } from "react";

const BuyStocksLayout = ({ addAlert }) => {
  const [updateBalanceFlag, setUpdateBalanceFlag] = useState(false);

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="flex">
          <TransferStocks updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} addAlert={addAlert} />
        </div>

        <div className="flex">
          <BuyStocksMarket />
        </div>
      </div>

      <div className="flex p-4">
        <BuyStocks updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} addAlert={addAlert} />
      </div>
    </>
  );
};

export default BuyStocksLayout;