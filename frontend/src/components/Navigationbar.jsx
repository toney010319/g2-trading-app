import { useNavigate } from "react-router-dom";
import PaymentMethodsModal from "../dashboard/modals/PaymentMethodsModal";

import ProfileModal from "../dashboard/modals/ProfileModal";
import { format } from "date-fns";
// import Navbalance from "./subcomponents/Navbalance";
import { useState, useEffect } from "react";
import { logoutUser } from "../lib/api";
import useAuth from "../context/hooks/useAuth";

// eslint-disable-next-line react/prop-types
const Navigationbar = ({ addAlert }) => {
    // const [balance, setBalance] = useState(500);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());
    const { setAuth } = useAuth()
    const handleClose = () => {
        setShowModal(false)
        setShowProfileModal(false);
    }

    const handleProfileClick = () => {
        setShowProfileModal(!showProfileModal);
    };


    const handleLogout = (event) => {
        logoutUser(event)
        // document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        // document.cookie = 'user_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        setAuth({})
        navigate('/')
        addAlert('success', 'You have successfully logged out')
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate = new Date();
            setCurrentDate(newDate);
            setCurrentTime(newDate.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])
    

    const formattedDate = format(currentDate, "MMMM dd, yyyy");

    return (

        <>
            {showModal ? (<PaymentMethodsModal handleClose={handleClose} addAlert={addAlert} />
            ) : null}



            <div className="flex min-w-full justify-between bg-gradient-to-r from-gray-400 to-gray-800 p-2 ">
                <div className="flex gap-2 ml-1">
                    <button
                        className="cursor-pointer text-white px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700"
                        onClick={() => setShowModal(true)}
                    >
                        Deposit
                    </button>


                    <span className="cursor-pointer text-white px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700">
                        Withdraw
                    </span>

                </div> 

                <div>
                    <span className="font-bold text-2xl">{currentTime}</span>
                    <span className="font-bold text-2xl ml-3">{formattedDate}</span>
                </div>

                <div className="flex flex-row ml-2">
                    <div className="relative">
                        <span
                            onClick={handleProfileClick}
                            className="cursor-pointer flex ml-2 mr-2 bg-white rounded-full">
                            <img
                                className="ml-1 mr-1"
                                src="https://www.svgrepo.com/show/498301/profile-circle.svg"
                                width="35"
                                alt="Profile" />
                        </span>
                        <div className="absolute top-full right-0">
                            {showProfileModal && (
                                <ProfileModal handleClose={() => setShowProfileModal(false)} setShowModal={setShowModal} />
                            )}
                        </div>
                    </div>



                    <span
                        className="flex justify-center cursor-pointer"
                        onClick={handleLogout}
                    >
                        <span
                            className="flex ml-2 mr-1 bg-red-500 hover:bg-red-700 text-white px-1 py-1 rounded-md">
                            <span className="mb-1">Logout</span>
                            <img
                                className="ml-1 mr-1"
                                src="https://www.svgrepo.com/show/421551/logout-log-out.svg"
                                width="25"
                                alt="Icon Svg Stock Exchange" />
                        </span>

                    </span>
                </div>
            </div>

        </>
    );
};

export default Navigationbar;