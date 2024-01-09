/* eslint-disable react/prop-types */
 
import Loading from "../../components/Loading";
 


 
const ShowUser = ({ user }) => {
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
   <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
        <table className="w-full">
  <tbody className="bg-white">
    {user && (
      
        <>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Name</td>
            <td className="px-4 py-3 text-sm border">{`${user.first_name} ${user.last_name}`}</td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Email</td>
            <td className="px-4 py-3 text-sm border">{user.email}</td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-md font-semibold border bg-gray-100">Balance</td>
            <td className="px-4 py-3 text-sm border">{user.balance.balance}</td>
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
            ):(<p>No transaction history</p>)}
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
 