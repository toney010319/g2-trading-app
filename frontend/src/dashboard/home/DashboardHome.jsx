import HomeCrypto from "./subcomponents/HomeCrypto";
import HomeForex from "./subcomponents/HomeForex";
import HomeStocks from "./subcomponents/HomeStocks";
import HomeBalance from "./subcomponents/HomeBalance";
import Gains from "./subcomponents/Gains";

const DashboardHome = () => {
    return (
    <>
        <div>
            <section className="flex flex-col w-full items-center">
                <div className="flex text-2xl font-bold underline underline-offset-2 bg-white flex-1 w-full justify-center opacity-50">Summary of Portfolio</div>
                <div className="flex w-full justify-around">
                    <div className="flex justify-around">
                        <div className="flex mx-5">
                            <HomeStocks />
                        </div>

                        <div className="flex mx-5">
                            <HomeCrypto />
                        </div>

                        <div className="flex mx-5">
                            <HomeForex />
                        </div>

                        </div>
                        <div>
                            <HomeBalance />
                        </div>
                </div>
                
            </section>
            <section className="flex-1 w-full items-center mt-4">
                        <Gains />
            </section>

        </div>
    </>
    )
}

export default DashboardHome;