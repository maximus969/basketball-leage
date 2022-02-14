import { Dispatch } from 'redux'
import { NewPlayerDto, PlayerDto, playersAPI } from '../../api/dto/IPlayer'
import { setAppStatus } from '../app/appSlice'
import { setPlayerData } from './playerSlice'
import { setPlayersData } from './playersSlice'

export const getPlayersTC =
    (name: string, id: number, page: number, pageSize: number) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus({ status: true }))
        playersAPI
            .getPlayers(name, id, page, pageSize)
            .then((res) => {
                if (res.request.status === 200) {
                    dispatch(setPlayersData(res.data))
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => {
                dispatch(setAppStatus({ status: false }))
            })
    }

export const getPlayerInfoTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    playersAPI
        .getPlayerInfo(id)
        .then((res) => {
            if (res.request.status === 200) {
                console.log(res.data)
                dispatch(setPlayerData(res.data))
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}

export const addPlayerTC = (data: NewPlayerDto) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    playersAPI
        .addPlayer(data)
        .then((res) => {
            if (res.request.status === 200) {
                alert('success')
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}

export const updatePlayerTC = (data: PlayerDto) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    playersAPI
        .updatePlayer(data)
        .then((res) => {
            if (res.request.status === 200) {
                console.log(res.data)
                dispatch(getPlayerInfoTC(res.data.id) as any)
                alert('Success')
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}

export const deletePlayerTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    playersAPI
        .deletePlayer(id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    setPlayerData({
                        name: '',
                        number: 0,
                        position: '',
                        team: 0,
                        birthday: '',
                        height: 0,
                        weight: 0,
                        avatarUrl: '',
                        id: 0,
                        teamName: ''
                    })
                )
                alert('success')
            }
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}
