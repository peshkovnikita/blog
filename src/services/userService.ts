import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, IUserResponse } from '../models/IUser.ts'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
    endpoints: (build) => ({
        createUser: build.mutation<IUserResponse, IUser>({
            query: (user: IUser) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
        }),
    }),
});