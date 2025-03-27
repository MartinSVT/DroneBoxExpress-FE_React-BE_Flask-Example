import { useEffect, useRef, useContext } from "react";
import requester from "../utilities/requester";
import useAuthRequester from "../utilities/authRequester";
import { UserContext } from "../contexts/userContext";

const loginUrl = 'http://127.0.0.1:5000/login';
const userDetailsUrl = 'http://127.0.0.1:5000/user-details'
const registerUrl = 'http://127.0.0.1:5000/register-user'
const userUpdateUrl = 'http://127.0.0.1:5000/user-update'
const userDeleteUrl = 'http://127.0.0.1:5000/user-delete'
const changePasswordUrl = 'http://127.0.0.1:5000/user-change-password'

export const useLogin = () => {
    const abortRef = useRef();

    const login = async (username, password) => {
        const result = await requester.post(
            loginUrl,
            { username, password },
            { signal: abortRef.current.signal }
        );
        return result; }

    useEffect(() => {
        const abortController = new AbortController();
        abortRef.current = abortController;
        return () => {abortController.abort();};
    }, []);

    return {
        login,
    }
};

export const useUserDetails = () => {
    const abortRef = useRef();

    const getUserDetails = async (token) => {
        const authOptions = {
            signal: abortRef.current.signal,
            headers: {
                'Authorization': `TOKEN ${token}`
            }
        }
        const result = await requester.get(userDetailsUrl, null, authOptions);
        return result;
    }

    useEffect(() => {
        const abortController = new AbortController();
        abortRef.current = abortController;
        return () => {abortController.abort();};
    }, []);

    return { 
        getUserDetails, 
    }
};

export const useUpdateUser = () => {
    const {authenticatedRequest} = useAuthRequester()
    const {userId} = useContext(UserContext)

    const update = async (passData) => {
        const result = await authenticatedRequest.put(`${userUpdateUrl}/${userId}`, passData);
        return result;
    }

    return {
        update,
    }
};


export const useRegister = () => {
    const abortRef = useRef();

    const registerUser = async (username, email, firstName, lastName, password, password2) => {
        const result = await requester.post(
            registerUrl,
            { 
                username: username, 
                email: email, 
                first_name: firstName, 
                last_name: lastName, 
                password: password, 
                password2: password2
             },
            { signal: abortRef.current.signal }
        );
        return result; }

    useEffect(() => {
        const abortController = new AbortController();
        abortRef.current = abortController;
        return () => {abortController.abort();};
    }, []);

    return {
        registerUser,
    }
};

export const useDeleteUser = () => {
    const {authenticatedRequest} = useAuthRequester()
    const {userId} = useContext(UserContext)

    const deleteUser = async () => {
        const result = await authenticatedRequest.delete(`${userDeleteUrl}/${userId}`);
        return result;
    }

    return {
        deleteUser,
    }
};

export const useChangePass = () => {
    const {authenticatedRequest} = useAuthRequester()

    const changePass = async (passData) => {
        const result = await authenticatedRequest.post(changePasswordUrl, passData);
        return result;
    }

    return {
        changePass,
    }
};