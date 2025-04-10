import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const imgPlug = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'

interface AuthState {
    token: string | null,
    username: string | null,
    bio: string | null,
    email: string | null,
    image: string | null,
}

const initialState: AuthState = {
    token: null,
    username: null,
    bio: null,
    email: null,
    image: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload);
        },
        setTokenFromStorage: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setUserData: (state: AuthState, action: PayloadAction<AuthState>) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.image = action.payload.image ?? imgPlug
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

export const { loginSuccess, setTokenFromStorage, setUserData, logout } = authSlice.actions
export default authSlice.reducer