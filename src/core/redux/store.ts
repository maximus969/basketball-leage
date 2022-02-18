import { Action, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { authReducer } from '../../modules/auth/authorizationSlice'
import { appReducer } from '../../modules/app/appSlice'
import { teamsReducer } from './../../modules/teams/teamsSlice'
import { playersReducer } from './../../modules/players/playersSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// const rootReducer = combineReducers({
//     auth: authReducer,
//     app: appReducer,
//     teams: teamsReducer,
//     players: playersReducer
// })

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        teams: teamsReducer,
        players: playersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})

// export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
    useSelector

// @ts-ignore
window.store = store
