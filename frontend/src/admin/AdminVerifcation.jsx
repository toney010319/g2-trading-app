import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading"
import { getUsers } from "../lib/adminapi";
import { createPortal } from "react-dom";
import Modal from "./modals/modal";
import VerifyUser from "./components/VerifyUser";


const AdminVerifcation = ({ addAlert }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // const [modalContent, setModalContent] = useState(null);
    const fetchUsersMemoized = useMemo(
        () => async () => {
            try {
                const response = await getUsers();
                console.log("res", response)
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

    console.log("user", users)
    return (
        <div>
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
                                    ) : users.length > 0 ? (
                                        users.map((user, index) => (
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
