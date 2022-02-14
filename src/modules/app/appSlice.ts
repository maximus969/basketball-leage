import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
    status: false,
    error: null
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }
})

export const appReducer = slice.reducer
export const setAppStatus = slice.actions.setAppStatus
export const setAppError = slice.actions.setAppError

export type InitialStateType = {
    status: boolean
    error: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
