import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
const [username, setUsername] = useState("");
const [firstName, setFirstName] = useState("");
const [middleName, setMiddleName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [birthday, setBirthday] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [agreed, setAgreed] = useState(false);
const navigate = useNavigate();

const navigateLogin = () => {
    console.log(username, firstName, middleName, lastName, email, birthday, password, confirmPassword, agreed);
    navigate('/')
}

    return (
    <>
        <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
            <div className="justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-azure-300 to-azure-700 m-2 p-5 pl-8 pr-8">
                <div className="flex flex-row justify-center mb-5">
                    <div className="z-10">
                        <img src="https://www.freeiconspng.com/uploads/stock-exchange-icon-png-10.png" width="50" alt="Icon Svg Stock Exchange" />
                    </div>
                    <div className="flex flex-col relative z-5">
                        <span className="font-bold text-3xl">Stellar</span>
                        <sub className="text-md ml-10">Markets</sub>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Username</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Username"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Email Address</span>
                            <input
                            className="rounded-sm w-64"
                            type="text"
                            placeholder=" Email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-2">
                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">First Name</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Middle Name</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Middle Name"
                            onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Last Name</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Birthdate</span>
                            <input
                            className="rounded-sm w-64"
                            type="date"
                            onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Password</span>
                                <input
                                className="rounded-sm w-64"
                                placeholder=" Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Confirm Password</span>
                                <input
                                className="rounded-sm w-64"
                                placeholder=" Confirm Password"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="flex mt-2">
                                <input
                                className="rounded-sm"
                                type="checkbox"
                                onChange={(e) => setAgreed(e.target.value)}
                                />
                                <span className="flex justify-start ml-1">I have read and agreed with the <button className="ml-1 text-blue-200 hover:text-blue-400 hover:underline">terms and conditions</button></span>
                        </div>


                    <div className="flex flex-col mt-1">
                        
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-4 mt-2">
                    <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700">Register</button>
                </div>
                <div className="flex flex-row justify-between">
                    <button className="flex mt-2 text-sm text-blue-200 hover:text-blue-400 hover:underline" onClick={navigateLogin}>Already Registered?</button>
                    <button className="flex mt-2 text-sm text-blue-200 hover:text-blue-400 hover:underline">Forgot Password</button>
                </div>
            </div>
        </div>
    </>
    );
    }

export default Registration;