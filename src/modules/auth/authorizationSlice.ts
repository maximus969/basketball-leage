import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setUserData(state) {
            return { isLoggedIn: true }
        },
        signOut(state) {
            return { isLoggedIn: false }
        }
    }
})

export const authReducer = slice.reducer
export const { setUserData } = slice.actions
export const { signOut } = slice.actions
