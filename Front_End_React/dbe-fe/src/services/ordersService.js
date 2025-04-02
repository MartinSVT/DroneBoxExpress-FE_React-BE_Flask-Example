import { useEffect, useState } from "react";
import useAuthRequester from "../utilities/authRequester";

const mainOrdersUrl = 'http://127.0.0.1:5000/orders';

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const {authenticatedRequest} = useAuthRequester()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        authenticatedRequest.get(mainOrdersUrl, null, {signal})
            .then(setOrders);

        return () => {
            abortController.abort();
        };
    }, []);

    return { orders };
};

export const useOrder = (orderId) => {
    const {authenticatedRequest} = useAuthRequester();
    const [order, setOrder] = useState({});

    useEffect(() => {
        async function getOrderData() {
            if (orderId) {
                const result = await authenticatedRequest.get(`${mainOrdersUrl}/${orderId}`);
                setOrder(result);
            }
        }
        getOrderData();
    }, [orderId]);

    return { 
        order,
    };
};

export const useCreateOrder = () => {
    const {authenticatedRequest} = useAuthRequester()

    const createOrder = async (orderData) => {
        const result = await authenticatedRequest.post(mainOrdersUrl, orderData);
        return result;
    }

    return {
        createOrder,
    }
}

export const useUpdateOrder = () => {
    const {authenticatedRequest} = useAuthRequester()

    const updateOrder = async (orderData, orderId) => {
        const result = await authenticatedRequest.put(`${mainOrdersUrl}/${orderId}`, orderData);
        return result;
    }

    return {
        updateOrder,
    }
};

export const useDeleteOrder = () => {
    const {authenticatedRequest} = useAuthRequester()

    const deleteOrder = async (orderId) => {
        const result = await authenticatedRequest.delete(`${mainOrdersUrl}/${orderId}`);
        return result;
    }

    return {
        deleteOrder,
    }
};