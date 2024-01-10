import { useEffect, useState } from "react"
import { deleteUser, getUsers } from "../lib/adminapi"
import Loading from "../components/Loading"
import Modal from "./modals/modal"
import { createPortal } from 'react-dom';
import ShowUser from "./components/ShowUser"
import EditUser from "./components/EditUser";


const AdminDashboardHome = () => {
  const [users, setUsers] = useState()
  const [ loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
 

  
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
          setUsers(response);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error)
          setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchUsers()
  }, [])
   
  const handleShowUser = (user) => {
    setShowModal(true);
    setSelectedUser(user);
    setModalContent("show");
  };

  const handleEditUser = (user) => {
    setShowModal(true);
    setSelectedUser(user);
    setModalContent("edit");
  };

 
  const renderModalContent = () => {
    switch (modalContent) {
      case "show":
        return <ShowUser user={selectedUser} />;
      case "edit":
        return <EditUser user={selectedUser} />;
      default:
        return null;
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
    catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  return (
  <>
  <section className="container mx-auto p-6 font-mono">
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">status</th>
              <th className="px-4 py-3">show</th>
              <th className="px-4 py-3">edit</th>
              <th className="px-4 py-3"> delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="flex justify-center w-full h-10">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.length > 0 ? (
                    users.map((user) => ( 
                    <tr key={user.id} className="text-gray-700">
                      <td className="px-4 py-3 text-ms font-semibold border">{`${user.first_name} ${user.last_name}`}</td>
                      <td className="px-4 py-3 text-ms font-semibold border">{user.email}</td>
                      <td className="px-4 py-3 text-ms font-semibold border">{user.status}</td>
                      <td className="px-4 py-3 text-ms font-semibold border "><button onClick={() => handleShowUser(user)} ><img src="https://www.svgrepo.com/show/509178/open.svg" 
                  width="25" 
                  alt="show" /></button>
                 
                  </td>
                      <td className="px-4 py-3 text-ms font-semibold border"><button  onClick={() => handleEditUser(user)}><img src="https://www.svgrepo.com/show/522527/edit-3.svg" 
                  width="25" 
                  alt="edit" /></button>
                   
            </td>
                      <td className="px-4 py-3 text-ms font-semibold border"><button onClick={()=> handleDeleteUser(user.id)}><img src="https://www.svgrepo.com/show/502608/delete-2.svg" 
                  width="25" 
                  alt="delete" /></button></td>
                      </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No User 
                      </td>
                    </tr>
                  )
                )}
          </tbody>
      </table>
      </div>
    </div>
  </section>
  {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            {renderModalContent()}
          </Modal>,
          document.body
        )}
  </>
  )
}

export default AdminDashboardHome
