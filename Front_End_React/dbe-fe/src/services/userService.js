import { useEffect, useRef } from "react";
import requester from "../utilities/requester";

const loginUrl = 'http://127.0.0.1:5000/login';
const userDetailsUrl = 'http://127.0.0.1:5000/user-details'
const registerUrl = 'http://127.0.0.1:5000/register-user'

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