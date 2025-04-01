import { useEffect, useState } from "react";
import useAuthRequester from "../utilities/authRequester";

const mainRoutesUrl = 'http://127.0.0.1:5000/routes';

export const useCustomeRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const {authenticatedRequest} = useAuthRequester()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        authenticatedRequest.get(mainRoutesUrl, null, {signal})
            .then(setRoutes);

        return () => {
            abortController.abort();
        };
    }, []);

    return { routes };
};

export const useCustomeRoute = (routeId) => {
    const {authenticatedRequest} = useAuthRequester();
    const [route, setRoute] = useState({});

    useEffect(() => {
        async function getRouteData() {
            if (routeId && routeId !== "Select Route") {
            const result = await authenticatedRequest.get(`${mainRoutesUrl}/${routeId}`);
            setRoute(result);
            }
        }
        getRouteData();
    }, [routeId]);

    return { 
        route,
    };
};

export const useCreateRoute = () => {
    const {authenticatedRequest} = useAuthRequester()

    const createRoute = async (routeData) => {
        const result = await authenticatedRequest.post(mainRoutesUrl, routeData);
        return result;
    }

    return {
        createRoute,
    }
}

export const useUpdateRoute = () => {
    const {authenticatedRequest} = useAuthRequester()

    const updateRoute = async (routeData, routeId) => {
        const result = await authenticatedRequest.put(`${mainRoutesUrl}/${routeId}`, routeData);
        return result;
    }

    return {
        updateRoute,
    }
};

export const useDeleteRoute = () => {
    const {authenticatedRequest} = useAuthRequester()

    const deleteRoute = async (routeId) => {
        const result = await authenticatedRequest.delete(`${mainRoutesUrl}/${routeId}`);
        return result;
    }

    return {
        deleteRoute,
    }
};