import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
    endpoints: (build) => ({
        fetchAllArticles: build.query<any, { limit: number, offset: number }>({
            query: ({ limit, offset }) => ({
                url: '/articles',
                params: { limit, offset }
            }),
        }),
        getArticle: build.query<any, string>({
            query: (slug) => ({
                url: `/articles/${slug}`,
            }),
        }),
    }),
});