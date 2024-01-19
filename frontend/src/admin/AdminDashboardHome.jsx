import { useEffect, useState, useMemo } from "react";
import { deleteUser, getUsers } from "../lib/adminapi";
import Loading from "../components/Loading";
import Modal from "./modals/modal";
import { createPortal } from "react-dom";
import ShowUser from "./components/ShowUser";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import axios from "axios";

const AdminDashboardHome = ({ addAlert }) => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user_id = document.cookie.split("user_id=")[1];
  
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();

  }, []);

  const fetchUsersMemoized = useMemo(
    () => async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        setLoading(false);
        return response;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    },
    [user_id]
  );

  useEffect(() => {
    fetchUsersMemoized();
  }, [fetchUsersMemoized, showModal]);

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
  const handleCreateUser = () => {
    setShowModal(true);
    setModalContent("createuser");
  };
  const renderModalContent = () => {
    switch (modalContent) {
      case "show":
        return (
          <ShowUser user={selectedUser} onClose={() => setShowModal(false)} />
        );
      case "edit":
        return (
          <EditUser
            user={selectedUser}
            onClose={() => setShowModal(false)}
            addAlert={addAlert}
          />
        );
      case "createuser":
        return (
          <CreateUser onClose={() => setShowModal(false)} addAlert={addAlert} />
        );
      default:
        return null;
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      addAlert("success", "User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedUsers = users
    .filter((user) => user.role !== 'Admin')
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    (users.filter((user) => user.role !== 'Admin').length || 1) / itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <p className=" flex justify-center  text-lg font-bold w-full mt-2">
            All Users
          </p>
          <button
            className="cursor-pointer text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950 mb-2 "
            onClick={() => handleCreateUser()}
          >
            Create User
          </button>
          <div className="w-full overflow-x-auto bg-white">
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
                ) : paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                      <tr key={user.id} className="text-gray-700">
                        <td className="px-4 py-3 text-ms font-semibold border">{`${user.first_name} ${user.last_name}`}</td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {user.status}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border ">
                          <button onClick={() => handleShowUser(user)}>
                            <img
                              src="https://www.svgrepo.com/show/509178/open.svg"
                              width="25"
                              alt="show"
                            />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          <button onClick={() => handleEditUser(user)}>
                            <img
                              src="https://www.svgrepo.com/show/522527/edit-3.svg"
                              width="25"
                              alt="edit"
                            />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          <button onClick={() => handleDeleteUser(user.id)}>
                            <img
                              src="https://www.svgrepo.com/show/502608/delete-2.svg"
                              width="25"
                              alt="delete"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No User
                    </td>
                  </tr>
                )}
              </tbody>
             
            </table>
            <div className="flex justify-center m-4">
                <button
                  onClick={handlePrevPage}
                  className="cursor-pointer text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950 mr-2"
                  disabled={currentPage === 1}
                >
                  Previous Page
                </button>
                <button
                  onClick={handleNextPage}
                  className="cursor-pointer text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950"
                  disabled={currentPage === totalPages}
                >
                  Next Page
                </button>
              </div>
          </div>
        </div>
      </section>
      {showModal &&
        createPortal(<Modal>{renderModalContent()}</Modal>, document.body)}
    </>
  );
};

export default AdminDashboardHome;
