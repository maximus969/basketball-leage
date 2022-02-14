import { Dispatch } from 'redux'
import { NewTeamDto, teamsAPI } from '../../api/dto/ITeam'
import { setAppStatus } from '../app/appSlice'
import { setTeamInfo } from './teamSlice'
import { setTeamsData } from './teamsSlice'
import { TeamDto } from '../../api/dto/ITeam'

export const getTeamsTC =
    (name: string, page: number, pageSize: number) => (dispatch: Dispatch) => {
        dispatch(setAppStatus({ status: true }))
        teamsAPI
            .getTeams(name, page, pageSize)
            .then((res) => {
                if (res.request.status === 200) {
                    dispatch(setTeamsData(res.data))
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => {
                dispatch(setAppStatus({ status: false }))
            })
    }

export const addTeamTC = (data: NewTeamDto) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    teamsAPI
        .addTeam(data)
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

export const getTeamInfoTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    teamsAPI
        .getTeamInfo(id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(setTeamInfo(res.data))
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}

export const updateTeamTC = (data: TeamDto) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    teamsAPI
        .updateTeam(data)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(setTeamInfo(res.data))
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

export const deleteTeamTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    teamsAPI
        .deleteTeam(id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    setTeamInfo({
                        name: '',
                        foundationYear: 0,
                        division: '',
                        conference: '',
                        imageUrl: '',
                        id: 0
                    })
                )
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
