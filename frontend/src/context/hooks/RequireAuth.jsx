import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();

    console.log("auth", auth)
    return (

        auth?.role ? <Outlet />
            : <Navigate to="/" />
    );
}

export default RequireAuth;