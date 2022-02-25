import { createAsyncThunk } from '@reduxjs/toolkit'
import { NewPlayerDto, PlayerDto, playersAPI } from '../../api/dto/IPlayer'
import { setAppStatus } from '../app/appSlice'
import { NavigateFunction } from 'react-router-dom'

export const fetchPlayers = createAsyncThunk(
    'players/fetchPlayerss',
    async function (
        { name, id, page, pageSize }: FetchPlayersProps,
        { dispatch, rejectWithValue }
    ) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await playersAPI.getPlayers(
                name,
                id,
                page,
                pageSize
            )
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR:', error.message)
                return rejectWithValue(error.message)
            }
            console.log('ERROR', error)
        } finally {
            dispatch(setAppStatus({ status: false }))
        }
    }
)

export const getPlayerInfo = createAsyncThunk(
    'players/getPlayerInfo',
    async function (id: number, { dispatch, rejectWithValue }) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await playersAPI.getPlayerInfo(id)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR:', error.message)
                return rejectWithValue(error.message)
            }
            console.log('ERROR', error)
        } finally {
            dispatch(setAppStatus({ status: false }))
        }
    }
)

export const addPlayer = createAsyncThunk(
    'players/addPlayer',
    async function (
        { data, navigate }: addPlayerProps,
        { dispatch, rejectWithValue }
    ) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await playersAPI.addPlayer(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            navigate(-1)
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR:', error.message)
                return rejectWithValue(error.message)
            }
            console.log('ERROR', error)
        } finally {
            dispatch(setAppStatus({ status: false }))
        }
    }
)

export const updatePlayer = createAsyncThunk(
    'players/updatePlayer',
    async function (
        { data, navigate }: updatePlayerProps,
        { dispatch, rejectWithValue }
    ) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await playersAPI.updatePlayer(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            navigate(-1)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR:', error.message)
                return rejectWithValue(error.message)
            }
            console.log('ERROR', error)
        } finally {
            dispatch(setAppStatus({ status: false }))
        }
    }
)

export const deletePlayer = createAsyncThunk(
    'players/deletePlayer',
    async function (
        { id, navigate }: deletePlayerProps,
        { dispatch, rejectWithValue }
    ) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await playersAPI.deletePlayer(id)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            navigate(-1)
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERROR:', error.message)
                return rejectWithValue(error.message)
            }
            console.log('ERROR', error)
        } finally {
            dispatch(setAppStatus({ status: false }))
        }
    }
)

type FetchPlayersProps = {
    name: string
    id: number[]
    page: number
    pageSize: number
}

type addPlayerProps = {
    data: NewPlayerDto
    navigate: NavigateFunction
}

type updatePlayerProps = {
    data: PlayerDto
    navigate: NavigateFunction
}

type deletePlayerProps = {
    id: number
    navigate: NavigateFunction
}
