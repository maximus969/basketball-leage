import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from '../../modules/auth/authorizationSlice'
import { appReducer } from '../../modules/app/appSlice'
import { teamsReducer } from './../../modules/teams/teamsSlice'
import { teamReducer } from './../../modules/teams/teamSlice'
import { playersReducer } from './../../modules/players/playersSlice'
import { playerReducer } from '../../modules/players/playerSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    teams: teamsReducer,
    team: teamReducer,
    players: playersReducer,
    player: playerReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
