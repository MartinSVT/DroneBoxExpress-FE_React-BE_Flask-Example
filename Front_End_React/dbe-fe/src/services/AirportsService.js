import { useEffect, useState } from "react";
import useAuthRequester from "../utilities/authRequester";

const mainAirportsUrl = 'http://127.0.0.1:5000/airports';

export const useAirports = () => {
    const [airports, setAirports] = useState([]);
    const {authenticatedRequest} = useAuthRequester()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        authenticatedRequest.get(mainAirportsUrl, null, {signal})
            .then(setAirports);

        return () => {
            abortController.abort();
        };
    }, []);

    return { airports };
};

export const useAirport = (airportId) => {
    const {authenticatedRequest} = useAuthRequester();
    const [airport, setAirport] = useState({});

    useEffect(() => {
        async function getAirportData() {
            const result = await authenticatedRequest.get(`${mainAirportsUrl}/${airportId}`);
            setAirport(result);
        }
        getAirportData();
    }, [airportId]);

    return { 
        airport,
    };
};

export const useCreateAirport = () => {
    const {authenticatedRequest} = useAuthRequester()

    const createAirport = async (airportData) => {
        const result = await authenticatedRequest.post(mainAirportsUrl, airportData);
        return result;
    }

    return {
        createAirport,
    }
}

export const useUpdateAirport = () => {
    const {authenticatedRequest} = useAuthRequester()

    const updateAirport = async (airportData, airportId) => {
        const result = await authenticatedRequest.put(`${mainAirportsUrl}/${airportId}`, airportData);
        return result;
    }

    return {
        updateAirport,
    }
};

export const useDeleteAirport = () => {
    const {authenticatedRequest} = useAuthRequester()

    const deleteAirport = async (airportId) => {
        const result = await authenticatedRequest.delete(`${mainAirportsUrl}/${airportId}`);
        return result;
    }

    return {
        deleteAirport,
    }
};