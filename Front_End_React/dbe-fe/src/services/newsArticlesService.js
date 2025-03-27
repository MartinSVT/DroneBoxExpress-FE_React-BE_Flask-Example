import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import requester from "../utilities/requester";
import useAuthRequester from "../utilities/authRequester";


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

export const useNewsArticleDetails = (articleId) => {
    const {userId, authenticatedRequest} = useAuthRequester();
    const [newsArticle, setNewsAricle] = useState({});

    useEffect(() => {
        async function getArticleData() {
            const result = await authenticatedRequest.get(`${getNewsArticlesUrl}/${articleId}`);
            setNewsAricle(result);
        }
        getArticleData()
    }, [articleId, userId]);

    return { 
        newsArticle,
    };
};

export const useCreateNewsArticle = () => {
    const {authenticatedRequest} = useAuthRequester()
    const {username, userId, token, isStaff} = useContext(UserContext)

    const create = async (NewsArticleData) => {
        const dataWithUser = {...NewsArticleData, 'article_user': userId};
        const result = await authenticatedRequest.post(createNewsArticlesUrl, dataWithUser);
        return result;
    }

    return {
        create,
    }
};

export const useUpdateNewsArticle = () => {
    const {authenticatedRequest} = useAuthRequester()
    const {username, userId, token, isStaff} = useContext(UserContext)

    const update = async (NewsArticleData, articleId) => {
        const dataWithUser = {...NewsArticleData, 'article_user': userId};
        const result = await authenticatedRequest.put(`${getNewsArticlesUrl}/${articleId}`, dataWithUser);
        return result;
    }

    return {
        update,
    }
};

export const useDeleteNewsArticle = () => {
    const {authenticatedRequest} = useAuthRequester()

    const deleteNewsArticle = async (articleId) => {
        const result = await authenticatedRequest.delete(`${getNewsArticlesUrl}/${articleId}`);
        return result;
    }

    return {
        deleteNewsArticle,
    }
};