/* eslint-disable react/prop-types */

import { useState } from "react";
import Logo from "../../assets/Logo";
import Loading from "../../components/Loading";
import { AdminApproval, AdminDisapproval } from "../../lib/adminapi";




const VerifyUser = ({ user, onClose, addAlert }) => {
    const [message, setMessage] = useState("")


    const handleApprove = async () => {

        const res = await AdminApproval(user.id)
        console.log("res", res?.status)
        if (res?.status == "200") {
            addAlert('success', res?.data?.message)
            onClose()
        }
        else (addAlert('error', res?.response?.data?.status?.message))

    }

    const handleDisapprove = async () => {

        const res = await AdminDisapproval(message, user.id)
        console.log("res", res?.status)
        if (res?.status == "200") {
            addAlert('success', res?.data?.message)
            onClose()
        }
        else (addAlert('error', res?.response?.data?.status?.message))

    }

    if (!user) {
        return (
            <div className="flex justify-center w-full h-10">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
                <div className=" relative justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-azure-300 to-azure-700 m-2 p-5 pl-8 pr-8">
                    <Logo />
                    <button
                        onClick={onClose}
                        className="  absolute top-0 right-0  "
                    >
                        <img

                            src="https://www.svgrepo.com/show/380138/x-close-delete.svg"
                            width="20"
                            alt="close" />
                    </button>
                    <h1>Personal Info</h1>
                    <div

                        className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Username</span>
                                <input
                                    className="rounded-sm"
                                    type="text"
                                    value={user.username}
                                    name="username"
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Email Address</span>
                                <input
                                    className="rounded-sm w-64"
                                    type="text"
                                    value={user.email}
                                    name="email"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-2">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">First Name</span>
                                <input
                                    className="rounded-sm"
                                    type="text"
                                    value={user.first_name}
                                    name="firstName"
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Middle Name</span>
                                <input
                                    className="rounded-sm"
                                    type="text"
                                    value={user.middle_name}
                                    name="middleName"
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Last Name</span>
                                <input
                                    className="rounded-sm"
                                    type="text"
                                    value={user.last_name}
                                    name="lastName"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Birthdate</span>
                                <input
                                    className="rounded-sm w-64"
                                    type="date"
                                    name="birthday"
                                    value={user.birthday}
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Select Role</span>
                                <select name="role" className="rounded-sm w-64" value={user.role}
                                    required readOnly>
                                    <option value="Trader">Trader</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5"><h1>Wallet</h1></div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">balance</span>
                                <input
                                    className="rounded-sm w-64"
                                    value={user.balance.balance}
                                    type="number"
                                    name="balance"
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">crypto</span>
                                <input
                                    className="rounded-sm w-64"
                                    value={user.balance.crypto}
                                    name="crypto"
                                    type="number"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">stocks</span>
                                <input
                                    className="rounded-sm w-64"
                                    value={user.balance.stocks}
                                    name="stocks"
                                    type="number"
                                    readOnly

                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">forex</span>
                                <input
                                    className="rounded-sm w-64"
                                    value={user.balance.forex}
                                    name="forex"
                                    type="number"
                                    readOnly

                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-1">
                            <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Please Type the reason of disapproval here."></textarea>
                        </div>


                        <div className="flex flex-row justify-evenly gap-4 mt-2">
                            <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" onClick={() => handleApprove(user)}>Approved</button>
                            <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" onClick={() => handleDisapprove(user)}>Disapproved</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}


export default VerifyUser
