import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponseType } from '../../api/dto/IAuthorization'

const initialState = {
    isLoggedIn: false,
    name: '',
    avatarUrl: '',
    token: ''
}

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setUserData(state, action: PayloadAction<LoginResponseType>) {
            return { ...action.payload, isLoggedIn: true }
        },
        signOut(state, action: PayloadAction<LoginResponseType>) {
            return { ...action.payload, isLoggedIn: false }
        }
    }
})

export const authReducer = slice.reducer
export const { setUserData } = slice.actions
export const { signOut } = slice.actions
