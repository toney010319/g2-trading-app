/* eslint-disable react/prop-types */

import Logo from "../../assets/Logo";
import Loading from "../../components/Loading";
import { updateUser } from "../../lib/adminapi";
import { useState } from "react";



const EditUser = ({ user, onClose, addAlert }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user.first_name || '',
    middleName: user?.middle_name || '',
    lastName: user?.last_name || '',
    birthday: user?.birthday || '',
    role: user?.role || '',
    balance: user?.balance?.balance || '',
    crypto: user?.balance?.crypto || '',
    stocks: user?.balance?.stocks || '',
    forex: user?.balance?.forex || '',
  }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  if (!user) {
    return (
      <div className="flex justify-center w-full h-10">
        <Loading />
      </div>
    );
  }
  console.log(user)
  return (
    <>
      <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
        <div className=" relative justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-azure-300 to-azure-700 m-2 p-5 pl-8 pr-8">
          <Logo />
          <button
            onClick={onClose}
            className="  absolute top-0 right-0  bg-gradient-to-b from-azure-300 to-azure-700 px-5  text-lg font-semibold text-slate-100 py-1 rounded-full shadow-slate-500 shadow-md hover:from-[#ff5b3e] hover:to-[#640d00f8] "
          >
            Close
          </button>
          <h1>Personal Info</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              const res = await updateUser(event, user.id)
              console.log("res", res)
              if (res?.data?.status?.code == "200") {
                addAlert('success', res?.data?.status.message)

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
                  value={formData.username}
                  name="username"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">Email Address</span>
                <input
                  className="rounded-sm w-64"
                  type="text"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">First Name</span>
                <input
                  className="rounded-sm"
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">Middle Name</span>
                <input
                  className="rounded-sm"
                  type="text"
                  value={formData.middleName}
                  name="middleName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">Last Name</span>
                <input
                  className="rounded-sm"
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleInputChange}
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
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">Select Role</span>
                <select name="role" className="rounded-sm w-64">
                  <option value="user">Trader</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-5"><h1>Wallet</h1></div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">balance</span>
                <input
                  className="rounded-sm w-64"
                  value={formData.balance}
                  type="number"
                  name="balance"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">crypto</span>
                <input
                  className="rounded-sm w-64"
                  value={formData.crypto}
                  name="crypto"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">stocks</span>
                <input
                  className="rounded-sm w-64"
                  value={formData.stocks}
                  name="stocks"
                  type="number"
                  onChange={handleInputChange}

                />
              </div>
              <div className="flex flex-col">
                <span className="flex justify-start mb-1 font-semibold">forex</span>
                <input
                  className="rounded-sm w-64"
                  value={formData.forex}
                  name="forex"
                  type="number"
                  onChange={handleInputChange}

                />
              </div>
            </div>

            <div className="flex flex-col mt-1">

            </div>


            <div className="flex flex-row justify-center gap-4 mt-2">
              <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" type="submit">Create</button>
            </div>
          </form>

        </div>
      </div>
    </>
  );

}


export default EditUser
