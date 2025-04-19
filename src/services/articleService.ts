import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) headers.set('Authorization', `Token ${token}`)
            return headers
        },
    }),
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
        postArticle: build.mutation({
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: article,
            }),
        }),
        updateArticle: build.mutation({
            query: ({article, slug}) => ({
                url: `/articles/${slug}`,
                method: 'PUT',
                body: article,
            }),
        }),
        deleteArticle: build.mutation({
            query: (slug) => ({
                url: `/articles/${slug}`,
                method: 'DELETE',
            }),
        }),
    }),
});