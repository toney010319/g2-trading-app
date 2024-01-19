import Logo from "../../assets/Logo";
import { createUser } from "../../lib/adminapi";
const CreateUser = ({ addAlert, onClose }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
                <div className=" relative justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-gray-300 to-gray-700 m-2 p-5 pl-8 pr-8">
                    <Logo />
                    <button
                        onClick={onClose}
                        className="  absolute top-0 right-0 "
                    >
                        <img
                            src="https://www.svgrepo.com/show/380138/x-close-delete.svg"
                            width="20"
                            alt="close" />
                    </button>
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault()
                            const res = await createUser(event)
                            if (res?.status == "200") {
                                addAlert('success', "User created successfully")
                                onClose()
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

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Birthdate</span>
                                <input
                                    className="rounded-sm w-64"
                                    type="date"
                                    name="birthday"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="flex justify-start mb-1 font-semibold">Select Role</span>
                                <select name="role" className="rounded-sm w-64">
                                    <option value="Trader">Trader</option>
                                    <option value="Admin">Admin</option>
                                </select>

                            </div>


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




                        <div className="flex flex-col mt-1">

                        </div>


                        <div className="flex flex-row justify-center gap-4 mt-2">
                            <button className="text-white px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700" type="submit">Create</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}

export default CreateUser;