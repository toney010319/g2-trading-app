import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading"
import { getUsers } from "../lib/adminapi";
import { createPortal } from "react-dom";
import Modal from "./modals/modal";
import VerifyUser from "./components/VerifyUser";


const AdminVerifcation = ({ addAlert }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;



    // const [modalContent, setModalContent] = useState(null);
    const fetchUsersMemoized = useMemo(
        () => async () => {
            try {
                const response = await getUsers();

                const filter = response.filter(user => user.status === 'pending')
                setUsers(filter)
                setLoading(false);

                return response;
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchUsersMemoized();
    }, [fetchUsersMemoized, showModal]);
    const handleShowUser = (user) => {
        setShowModal(true);
        setSelectedUser(user);
        // setModalContent("show");
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);
    const totalPages = Math.ceil(users.length / itemsPerPage);


    return (
        <div>
            <>
                <p className=" flex justify-center  text-lg font-bold w-full mt-5">Verify Users</p>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div className="w-full overflow-x-auto bg-white">
                            <table className="w-full bg-white">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">status</th>
                                        <th className="px-4 py-3">Verify</th>


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
                                        paginatedUsers.map((user, index) => (
                                            <tr key={index} className="text-gray-700">
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
                    createPortal(
                        <Modal >
                            {<VerifyUser user={selectedUser} onClose={() => setShowModal(false)} addAlert={addAlert} />}
                        </Modal>,
                        document.body
                    )}
            </>
        </div>
    )
}

export default AdminVerifcation
