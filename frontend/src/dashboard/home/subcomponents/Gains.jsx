import StockGains from "./gains/StockGains";
import CryptoGains from "./gains/CryptoGains";
import ForexGains from "./gains/ForexGains";

const Gains = () => {
  return (
    <>
    <div>
        <div className="flex flex-row justify-around">
            <div className="flex shadow-md rounded-md">
                <StockGains />
            </div>
            <div className="flex shadow-md rounded-md">
                <CryptoGains />
            </div>
            <div className="flex  shadow-md rounded-md">
                <ForexGains />
            </div>
        </div>
    </div>
    </>
  );
};

export default Gains;