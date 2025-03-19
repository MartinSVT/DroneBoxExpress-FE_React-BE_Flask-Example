import { useEffect, useState } from "react";
import requester from "../utilities/requester";

const getNewsArticlesUrl = 'http://127.0.0.1:5000/news';
const createNewsArticlesUrl = 'http://127.0.0.1:5000/add-news';

export const useNewsArticles = () => {
    const [articles, setArticles] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        requester.get(getNewsArticlesUrl, null, {signal})
            .then(setArticles);

        return () => {
            abortController.abort();
        };
    }, []);

    return { articles };
};


export const useCreateNewsArticle = () => {
    const { AuthRequester } = useAuth();
    // Add user id to data 

    const create = (NewsArticleData) =>
        requester.post(createNewsArticlesUrl, NewsArticleData);

    return {
        create,
    }
};