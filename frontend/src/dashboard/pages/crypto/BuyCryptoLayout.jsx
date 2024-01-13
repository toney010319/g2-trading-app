import TransferCrypto from "./TransferCrypto";
import BuyCryptoMarket from "./subcomponents/BuyCryptoMarket";
import BuyCrypto from "./BuyCrypto";
import { useState } from "react";

const BuyCryptoLayout = () => {
  const [updateBalanceFlag, setUpdateBalanceFlag] = useState(false);

  return (
    <>
      <div className="flex justify-around mt-3 h-96">
        <div className="flex">
          <TransferCrypto updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
        </div>

        <div className="flex">
          <BuyCryptoMarket />
        </div>
      </div>

      <div className="flex p-4">
        <BuyCrypto updateBalanceFlag={updateBalanceFlag} setUpdateBalanceFlag={setUpdateBalanceFlag} />
      </div>
    </>
  );
};

export default BuyCryptoLayout;
