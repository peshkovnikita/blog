import { AppDispatch } from '../store/store.ts';
import { articleSlice } from '../store/reducers/ArticleSlice.ts';

const rootURL = 'https://blog-platform.kata.academy/api'

export const getArticles = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(articleSlice.actions.articleFetching())
        const response = await fetch(`${rootURL}/articles`)
        const data = await response.json()
        dispatch(articleSlice.actions.articleFetchingSuccess(data))
    }
    catch (e) {
        dispatch(articleSlice.actions.articleFetchingError(e.message))
    }

}