import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Registration } from './Registration'
import { Teams } from './GetTeams'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../core/redux/store'
import { AddTeam } from './AddTeam'
import { TeamInfo } from './TeamInfo'
import { UpdateTeam } from './UpdateTeam'
import { Players } from './Players'
import { PlayerInfo } from './PlayerInfo'
import { AddPlayer } from './AddPlayer'
import { UpdatePlayer } from './UpdatePlayer'
import { PageNotFound } from './PageNotFound'

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    TEAMS: '/teams',
    ADD_TEAMS: '/teams/add-new-team',
    TEAM_DESCRIPTION: '/teams/:id',
    UPDATE_TEAM: '/teams/:id/update-team',
    PLAYERS: '/players',
    PLAYER_INFO: '/players/:id',
    ADD_PLAYER: '/players/add-new-player',
    UPDATE_PLAYER: '/players/:id/update-player',
    PAGE_NOT_FOUND: '/page-not-found'
}

export const ProjectRoutes = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    )
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTRATION} element={<Registration />} />
            <Route
                path={PATH.TEAMS}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <Teams />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.ADD_TEAMS}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <AddTeam />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.TEAM_DESCRIPTION}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <TeamInfo />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.UPDATE_TEAM}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <UpdateTeam />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.PLAYERS}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <Players />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.PLAYER_INFO}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <PlayerInfo />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.ADD_PLAYER}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <AddPlayer />
                    </RequireAuth>
                }
            />
            <Route
                path={PATH.UPDATE_PLAYER}
                element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                        <UpdatePlayer />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

const RequireAuth = (props: RequireAuthPropsType) => {
    return props.isLoggedIn ? props.children : <Navigate to={PATH.LOGIN} />
}

export type RequireAuthPropsType = {
    isLoggedIn: boolean
    children: JSX.Element
}
