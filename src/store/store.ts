import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import articleReducer from './reducers/ArticleSlice.ts'
import { articleAPI } from '../services/articleService.ts'
import { userAPI } from '../services/userService.ts'
import authReducer from './reducers/AuthSlice.ts'

const rootReducer = combineReducers({
    auth: authReducer,
    page: articleReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [articleAPI.reducerPath]: articleAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(articleAPI.middleware, userAPI.middleware),
        devTools: true
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']