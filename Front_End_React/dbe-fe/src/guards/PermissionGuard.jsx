import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/userContext";


export default function PermissionGuard() {
    const {isStaff} = useContext(UserContext)

    if (!isStaff) {
        return <Navigate to="/login" />
    }

    return <Outlet />;
}