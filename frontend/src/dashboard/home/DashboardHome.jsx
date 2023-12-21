import HomeCrypto from "./subcomponents/HomeCrypto";
import HomeForex from "./subcomponents/HomeForex";
import HomeStocks from "./subcomponents/HomeStocks";

const DashboardHome = () => {
    return (
    <>
        <div>
            <section className="flex flex-col w-full items-center">
                <div className="flex text-2xl font-semibold underline underline-offset-2">Summary of Portfolio</div>
                <div className="flex w-full justify-around">
                    <div>
                        <HomeStocks />
                    </div>

                    <div>
                        <HomeCrypto />
                    </div>

                    <div>
                        <HomeForex />
                    </div>
                </div>
            </section>
            <section className="flex w-full items-center">
                <div className="flex w-full justify-between">
                    <div className="flex-1 px-10 py-10 shadow-md rounded-md">
                        Stock Gains
                    </div>
                    <div className="flex-1 px-10 py-10 shadow-md rounded-md">
                        Crypto Gains
                    </div>
                    <div className="flex-1 px-10 py-10 shadow-md rounded-md">
                        Forex Gains
                    </div>
                </div>
            </section>
            <section className="flex w-full items-center">
                <div className="flex w-full h-full bg-yellow-200">
                    <div>
                        Messages
                    </div>
                </div>
            </section>

        </div>
    </>
    )
}

export default DashboardHome;