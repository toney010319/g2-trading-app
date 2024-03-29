import { useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";
import { useState } from "react";
import Logo from "../assets/Logo";
import TermsAndConditions from "./modals/TermsAndConditions";

// eslint-disable-next-line react/prop-types
const Registration = ({ addAlert }) => {
    const [agreed, setAgreed] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [termsError, setTermsError] = useState(false);

    const handleClose = () => {
        setShowModal(false)
    }

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/')
        console.log(agreed)
        console.log(termsError)
    }


    return (
        <>
         {showModal ? (<TermsAndConditions handleClose={handleClose} />
            ) : null}
            <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
                <div className="justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-gray-300 to-gray-700 m-2 p-5 pl-8 pr-8">
                    <Logo />

                    <form
                        onSubmit={async (event) => {
                            event.preventDefault()
                            if (!agreed) {
                                addAlert('error', 'Please agree to the terms and conditions')
                                setTermsError(true);
                                return;
                            }
                            setTermsError(false);
                            const res = await registerUser(event)
                            if (res?.data?.status?.code == "200") {
                                addAlert('success', res?.data?.status.message)
                                navigateLogin()
                            }
                            else
                                addAlert('error', res?.response?.data?.status?.message)
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
                            <span className="flex justify-start ml-1">I have read and agreed with the 
                            <button className="ml-1 text-blue-200 hover:text-blue-400 hover:underline"
                            onClick={() => setShowModal(true)}>
                                Terms and Conditions
                            </button>
                            </span>
                        </div>


                        <div className="flex flex-col mt-1">

                        </div>


                        <div className="flex flex-row justify-center gap-4 mt-2">
                            <button className="text-white px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700" type="submit">Register</button>
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