import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticlesState {
    currentPage: number
    articlesCount: number
}

const initialState: IArticlesState = {
    currentPage: 1,
    articlesCount: 0
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setCurrentPage(state: IArticlesState, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setArticlesCount(state: IArticlesState, action: PayloadAction<number>) {
            state.articlesCount = action.payload;
        }
    },
})

export const { setCurrentPage, setArticlesCount } = articleSlice.actions
export default articleSlice.reducer