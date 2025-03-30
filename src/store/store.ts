import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import articleReducer from './reducers/ArticleSlice.ts'

const rootReducer = combineReducers({
    articleReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: true
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']