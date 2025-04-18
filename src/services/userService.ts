import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, IUserResponse } from '../models/IUser.ts'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) headers.set('Authorization', `Token ${token}`)
            return headers
        },
    }),
    endpoints: (build) => ({
        createUser: build.mutation<IUserResponse, IUser>({
            query: (user: IUser) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            }),
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: '/user',
                method: 'PUT',
                body: user
            }),
        }),
        getUser: build.query({
            query: () => '/user',
        })
    }),
});