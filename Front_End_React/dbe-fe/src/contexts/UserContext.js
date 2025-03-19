import { createContext } from "react";


export const UserContext = createContext({
    userId: 0,
    username: '',
    token: '',
    isStaff: false,
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});