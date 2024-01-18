import { logoutUser } from "../../lib/api";
import Logo from "../../assets/Logo";
import { Link, useNavigate } from "react-router-dom";
import AdminVerifcation from "../AdminVerifcation";
import useAuth from "../../context/hooks/useAuth";

// eslint-disable-next-line react/prop-types
const AdminNavigationBar = ({ addAlert }) => {
    // const [balance, setBalance] = useState(500);
    const navigate = useNavigate();
    const { setAuth } = useAuth()

    const handleLogout = (event) => {
        logoutUser(event)
        // document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        // document.cookie = 'user_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        setAuth({})
        navigate('/')
        addAlert('success', 'You have successfully logged out')

    }
    return (
        <>
            <div className="flex min-w-full justify-between bg-gradient-to-r from-azure-400 to-azure-900 p-2">
                <Logo />
                <div className="flex gap-2 ml-1">
                    <Link to="/admin" className="cursor-pointer text-white px-2 py-1 bg-azure-700 rounded-md hover:bg-azure-500">
                        Dashboard
                    </Link>
                    <Link to="/admin/verification" element={<AdminVerifcation addAlert={addAlert} />}
                        className="cursor-pointer text-white px-2 py-1 bg-azure-700 rounded-md hover:bg-azure-500"

                    >
                        Verification
                    </Link>


                    <Link to="/admin/transaction" className="cursor-pointer text-white px-2 py-1 bg-azure-700 rounded-md hover:bg-azure-500">
                        Transaction history
                    </Link>

                    <div>
                        {/* <Navbalance balance={balance} /> */}
                    </div>
                </div>

                <div className="flex flex-row ml-2">
                    <div className="relative">
                        <span

                            className="cursor-pointer flex ml-2 mr-2 bg-white rounded-full">
                            <img
                                className="ml-1 mr-1"
                                src="https://www.svgrepo.com/show/498301/profile-circle.svg"
                                width="35"
                                alt="Profile" />
                        </span>
                        <div className="absolute top-full right-0">

                        </div>
                    </div>



                    <span
                        className="flex justify-center cursor-pointer"
                        onClick={handleLogout}
                    >
                        <span
                            className="flex ml-2 mr-1 bg-red-500 hover:bg-red-700 text-white px-1 py-1 rounded-md">
                            <span className="mb-1">Logout</span>
                            <img
                                className="ml-1 mr-1"
                                src="https://www.svgrepo.com/show/421551/logout-log-out.svg"
                                width="25"
                                alt="Icon Svg Stock Exchange" />
                        </span>

                    </span>
                </div>
            </div>

        </>
    );
};

export default AdminNavigationBar;