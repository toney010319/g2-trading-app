import TransferForex from "./TransferForex.jsx";
import BuyForexMarket from "./subcomponents/BuyForexMarket.jsx";
import BuyForex from "./BuyForex.jsx";
import { useState } from "react";

const BuyForexLayout = () => {
  const [updateBalanceFlag, setUpdateBalanceFlag] = useState(false);

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="flex">
          <TransferForex updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
        </div>

        <div className="flex">
          <BuyForexMarket />
        </div>
      </div>

      <div className="flex p-4">
        <BuyForex updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
      </div>
    </>
  );
};

export default BuyForexLayout;
