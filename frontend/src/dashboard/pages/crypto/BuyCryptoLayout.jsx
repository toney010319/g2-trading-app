import TransferCrypto from "./TransferCrypto";
import BuyCryptoMarket from "./subcomponents/BuyCryptoMarket";
import BuyCrypto from "./BuyCrypto";
import { useState } from "react";

const BuyCryptoLayout = ({ addAlert }) => {
  const [updateBalanceFlag, setUpdateBalanceFlag] = useState(false);

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="flex">
          <TransferCrypto addAlert={addAlert} updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
        </div>

        <div className="flex">
          <BuyCryptoMarket />
        </div>
      </div>

      <div className="flex p-4">
        <BuyCrypto addAlert={addAlert} updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
      </div>
    </>
  );
};

export default BuyCryptoLayout;
