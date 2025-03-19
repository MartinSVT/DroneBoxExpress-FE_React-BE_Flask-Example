import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import requester from "../utilities/requester";
import { UserContext } from "../contexts/UserContext";

const loginUrl = 'http://127.0.0.1:5000/login';
const userDetailsUrl = 'http://127.0.0.1:5000/user-details'

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