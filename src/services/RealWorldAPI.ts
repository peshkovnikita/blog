import { createAsyncThunk } from '@reduxjs/toolkit';

const rootURL = 'https://blog-platform.kata.academy/api'

export const fetchAllArticles = createAsyncThunk('article/fetchAll', async(_, thunkAPI) => {
        try {
            const response = await fetch(`${rootURL}/articles`)
            if(!response.ok) throw new Error('Network Error')
            return await response.json()
        }
        catch(e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)