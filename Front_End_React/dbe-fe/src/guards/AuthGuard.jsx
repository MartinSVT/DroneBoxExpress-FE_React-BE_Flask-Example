import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/userContext";


export default function AuthGuard() {
    const {userId} = useContext(UserContext)
    
    if (!userId) {
        return <Navigate to="/login" />
    }

    return <Outlet />;
}