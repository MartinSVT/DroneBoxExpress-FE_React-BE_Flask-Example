import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import requester from "../utilities/requester";
import useAuthRequester from "../utilities/authRequester";

const getAllRoutesUrl = 'http://127.0.0.1:5000/routes';

export const useCustomeRoutes = () => {
    const [routes, setRoutes] = useState();
    const {authenticatedRequest} = useAuthRequester()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        authenticatedRequest.get(getAllRoutesUrl, null, {signal})
            .then(setRoutes);

        return () => {
            abortController.abort();
        };
    }, []);

    return { routes };
};