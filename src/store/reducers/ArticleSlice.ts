import { IArticle } from '../../models/IArticle.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticlesState {
    allArticles: IArticle[];
    articlesCount: number;
    isLoading: boolean;
    error: null | string;
}

interface IAction {
    type: string;
    payload?: any;
}

const initialState: IArticlesState = {
    allArticles: [],
    articlesCount: 0,
    isLoading: false,
    error: null,
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        articleFetching(state) {
            state.isLoading = true;
        },
        articleFetchingSuccess(state, action) {
            const { articles,  articlesCount } = action.payload
            state.allArticles = articles;
            state.articlesCount = articlesCount;
            state.isLoading = false;
            state.error = '';
        },
        articleFetchingError(state, action) {
            state.isLoading = false;
            state.eError = action.payload;
        }
    }
})

export default articleSlice.reducer