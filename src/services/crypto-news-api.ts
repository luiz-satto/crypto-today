import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ICryptoNewsData from '../interfaces/ICryptoNewsData';

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': process.env.REACT_APP_BING_NEWS_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_BING_NEWS_API_KEY
};

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders });

interface IParams {
    newsCategory: string,
    count: number
}

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BING_NEWS_API_BASE_URL }),
    endpoints: (builder) => ({
        getNews: builder.query<ICryptoNewsData, IParams>({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        }),
    }),
});

export const {
    useGetNewsQuery
} = cryptoNewsApi;