import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addBalance } from "../lib/api";
import { useState, useEffect } from "react";
import { getProfile } from "../lib/api";
// eslint-disable-next-line react/prop-types
const Deposit = ({ addAlert }) => {
    const [searchParams] = useSearchParams();
    const balance = searchParams.get("amount");
    const user_id = document.cookie.split('user_id=')[1];
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        let response = await getProfile(user_id)
        setProfile(response)
        return response
      }
    const handlePayNow = async () => {

        try {
            const transactionData = {
                transaction_category: 'Deposit',
                date: new Date()
            };
            const response = await addBalance(balance, user_id, transactionData);
            addAlert('success', 'Deposit successful!');
            navigate('/dashboard')
            balance('')


        } catch (error) {
            if (error.response) {
                addAlert('error', error.response.data.message);

            }
        }
    }

    useEffect(() => {
        fetchProfile();
      }, [user_id]);

    return (
        <>
            <div className="min-w-screen min-h-screen bg-gray-50 py-5">
                <div className="px-5">
                    <div className="mb-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Checkout</h1>
                    </div>
                </div>
                <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                    <div className="w-full">
                        <div className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div className="w-full flex items-center">
                                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img className="rounded-md" src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="90" alt="Icon Svg Stock Exchange" />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-semibold uppercase text-gray-600">Stellar Markets Credits</h6>
                                            <p className="text-gray-400">x 1</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-600 text-xl">{balance} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200">
                                    <div className="-mx-2 flex items-end justify-end">
                                        <div className="flex-grow px-2 lg:max-w-xs">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                            <div>
                                                <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Subtotal</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">{balance}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Total</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold text-gray-400 text-sm">PHP</span>
                                            <span className="font-semibold">{balance}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 md:w-5/12">
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Contact</span>
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <span>{profile.first_name} {profile.middle_name} {profile.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Billing Address</span>
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <span>Philippines</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    <div className="w-full p-3 border-b border-gray-200">
                                        <div className="mb-5">
                                            <label className="flex items-center cursor-pointer">
                                                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" />
                                            </label>
                                        </div>
                                        <div>
                                            <div className="mb-3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                                <div>
                                                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Juan Dela Cruz" type="text" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                                <div>
                                                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                                                </div>
                                            </div>
                                            <div className="mb-3 -mx-2 flex items-end">
                                                <div className="px-2 w-1/4">
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                                    <div>
                                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Month</label>
                                                        <div>
                                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 w-1/4">
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Day</label>
                                                    <div>
                                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="00" type="text" />
                                                    </div>
                                                </div>
                                                <div className="px-2 w-1/4">
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                                    <div>
                                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="block w-full max-w-xs mx-auto bg-azure-700 hover:bg-azure-950  text-white rounded-lg px-3 py-2 font-semibold"
                                        onClick={handlePayNow}
                                    >
                                        <i className="mdi mdi-lock-outline mr-1">
                                        </i> PAY NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deposit;