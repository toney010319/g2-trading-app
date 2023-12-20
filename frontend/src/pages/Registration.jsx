 
import { useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";
import { useState } from "react";
 
// eslint-disable-next-line react/prop-types
const Registration = ({ addAlert }) => {
    const [agreed, setAgreed] = useState(false)
 
const navigate = useNavigate();

const navigateLogin = () => {
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

                <form 
                onSubmit={async(event) => {
                    event.preventDefault()
                    const data = await registerUser(event)
                    console.log(data)
                    if(data.statusText !== "OK"){
                        addAlert('error', data.errors[0])
                    }
                    else{
                        addAlert('success', 'You have successfully registered')
                        navigateLogin()
                    }
                    }} 
                    className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Username</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Username"
                            name="username"
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Email Address</span>
                            <input
                            className="rounded-sm w-64"
                            type="text"
                            placeholder=" Email"
                            name="email"
                            required
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
                           name="firstName"
                           required
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Middle Name</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Middle Name"
                            name="middleName"
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Last Name</span>
                            <input
                            className="rounded-sm"
                            type="text"
                            placeholder=" Last Name"
                            name="lastName"
                            required
                            />
                        </div>
                    </div>

                        <div className="flex flex-col">
                            <span className="flex justify-start mb-1 font-semibold">Birthdate</span>
                            <input
                            className="rounded-sm w-64"
                            type="date"
                           name="birthday"
                           required
                            />
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Password</span>
                                <input
                                className="rounded-sm w-64"
                                placeholder=" Password"
                                type="password"
                                name="password"
                                required
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Confirm Password</span>
                                <input
                                className="rounded-sm w-64"
                                placeholder=" Confirm Password"
                                name="confirmPassword"
                                type="password"
                                required
                                
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
              

                    <div className="flex flex-row justify-center gap-4 mt-2">
                        <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" type="submit">Register</button>
                    </div>
                </form>
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