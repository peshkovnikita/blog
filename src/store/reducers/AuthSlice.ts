import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const imgPlug = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'

interface AuthState {
    token: string | null,
    username: string | null,
    email: string | null,
    image: string | null,
}

const initialState: AuthState = {
    token: null,
    username: null,
    email: null,
    image: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state: AuthState, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token
            state.username = action.payload.username
            state.email = action.payload.email
            state.image = action.payload.image ?? imgPlug
            localStorage.setItem('token', action.payload.token);
        },
        setTokenFromStorage: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state: AuthState) => {
            state.token = null
            state.username = null
            state.email = null
            state.image = null
            localStorage.removeItem('token')
        }
    },
})

export const { setUserData, setTokenFromStorage, logout } = authSlice.actions
export default authSlice.reducer