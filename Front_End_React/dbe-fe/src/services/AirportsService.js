import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import requester from "../utilities/requester";
import useAuthRequester from "../utilities/authRequester";

const getAllAirportsUrl = 'http://127.0.0.1:5000/airports';

export const useAirports = () => {
    const [airports, setAirports] = useState();
    const {authenticatedRequest} = useAuthRequester()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        authenticatedRequest.get(getAllAirportsUrl, null, {signal})
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
            const result = await authenticatedRequest.get(`${getAllAirportsUrl}/${airportId}`);
            setAirport(result);
        }
        getAirportData();
    }, [airportId]);

    return { 
        airport,
    };
};