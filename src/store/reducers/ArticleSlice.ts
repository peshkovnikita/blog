import { IArticle } from '../../models/IArticle.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllArticles } from '../../services/RealWorldAPI.ts';

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArticles.pending, (state:IArticlesState) => {
                state.isLoading = true;
            })
            .addCase(fetchAllArticles.fulfilled, (state:IArticlesState, action:IAction) => {
                const { articles,  articlesCount } = action.payload
                state.allArticles = articles;
                state.articlesCount = articlesCount;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(fetchAllArticles.rejected, (state:IArticlesState, action:IAction) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
})

export default articleSlice.reducer