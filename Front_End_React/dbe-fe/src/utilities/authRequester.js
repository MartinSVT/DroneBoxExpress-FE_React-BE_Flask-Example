import { useCallback, useContext, useMemo } from "react";
import { UserContext } from "../contexts/userContext";
import requester from "./requester";


export default function useAuthRequester() {
    const {username, userId, token, isStaff} = useContext(UserContext)

    const requesterAuthWrapper = useCallback((method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'Authorization': `TOKEN ${token}`,
                ...options.headers
            }
        };
        return requester.baseRequester(method, url, data, token ? authOptions : options);
    }, [token]);

    const modifiedRequestObject = useMemo(() => ({
        get: requesterAuthWrapper.bind(null, 'GET'),
        post: requesterAuthWrapper.bind(null, 'POST'),
        put: requesterAuthWrapper.bind(null, 'PUT'),
        delete: requesterAuthWrapper.bind(null, 'DELETE'),
    }), [requesterAuthWrapper])

    return {
        userId: userId,
        authenticatedRequest: modifiedRequestObject
    }
};