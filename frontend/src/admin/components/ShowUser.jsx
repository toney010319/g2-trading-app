/* eslint-disable react/prop-types */

import Loading from "../../components/Loading";




const ShowUser = ({ user, onClose }) => {
  if (!user) {
    return (
      <div className="flex justify-center w-full h-10">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <section className="  max-w-screen-xl w-full max-h-screen overflow-scroll container mx-12 p-6 font-mono relative">
        <div className="w-full mb-8 overflow-scroll rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <button
              onClick={onClose}
              className="  absolute top-0 right-0"
            >
              <img
                className="mt-6 mr-6"
                src="https://www.svgrepo.com/show/380138/x-close-delete.svg"
                width="20"
                alt="close" />
            </button>
            <table className="w-full">
              <thead>
                <tr>
                  <th colSpan="2" className="text-md font-semibold text-gray-700 px-4 py-3 border bg-gray-100">
                    Personal Information
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {user && (

                  <>

                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Name</td>
                      <td className="px-4 py-3 text-sm border">{`${user.first_name} ${user.last_name} ${user.middle_name}`}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Email</td>
                      <td className="px-4 py-3 text-sm border">{user.email}</td>
                    </tr>

                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">birthday</td>
                      <td className="px-4 py-3 text-sm border">{user.birthday}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Joined</td>
                      <td className="px-4 py-3 text-sm border">{user.created_at}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Status</td>
                      <td className="px-4 py-3 text-sm border">{user.status}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Role</td>
                      <td className="px-4 py-3 text-sm border">{user.role}</td>
                    </tr>
                    <tr>
                      <th colSpan="2" className="text-md font-semibold text-gray-700 px-4 py-3 border bg-gray-100">
                        Wallet
                      </th>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Balance</td>
                      <td className="px-4 py-3 text-sm border">{user.balance.balance}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Forex</td>
                      <td className="px-4 py-3 text-sm border">{user.balance.forex}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Stocks</td>
                      <td className="px-4 py-3 text-sm border">{user.balance.stocks}</td>
                    </tr>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Crypto</td>
                      <td className="px-4 py-3 text-sm border">{user.balance.crypto}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-center py-4">
                        {user.transaction_history > 0 ? (
                          user.transaction_history.map((transaction, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm border">{transaction.id}</td>
                              <td className="px-4 py-3 text-sm border">{transaction.user_id}</td>
                              <td className="px-4 py-3 text-sm border">{transaction.balance}</td>
                              <td className="px-4 py-3 text-sm border">{transaction.created_at}</td>
                              <td className="px-4 py-3 text-sm border">{transaction.updated_at}</td>
                            </tr>
                          ))
                        ) : (<p>No transaction history</p>)}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );

}

export default ShowUser
