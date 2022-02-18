import { Dispatch } from 'redux'
import { NewTeamDto, TeamDtoPageResult, teamsAPI } from '../../api/dto/ITeam'
import { setAppStatus } from '../app/appSlice'
import { setTeamsData, setTeamInfo } from './teamsSlice'
import { TeamDto } from '../../api/dto/ITeam'
import { NavigateFunction } from 'react-router-dom'
import { createAsyncThunk } from '@reduxjs/toolkit'


// export const getTeamsTC =
//     (name: string, page: number, pageSize: number) => (dispatch: Dispatch) => {
//         // dispatch(setAppStatus({ status: true }))
//         teamsAPI
//             .getTeams(name, page, pageSize)
//             .then((res) => {
//                 if (res.request.status === 200) {
//                     dispatch(setTeamsData(res.data))
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response)
//             })
//             .finally(() => {
//                 // dispatch(setAppStatus({ status: false }))
//             })
//     }

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async function({searchTeam, page, pageSize}: fetchTeamsProps, { dispatch, rejectWithValue}) { 
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await teamsAPI.getTeams(searchTeam, page, pageSize )
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR:", error.message)
                return rejectWithValue(error.message)
              }
            console.log("ERROR", error)
        } finally {
        dispatch(setAppStatus({ status: false }))
        }
    }
)

// export const addTeamTC =
//     (data: NewTeamDto, navigate: NavigateFunction) => (dispatch: Dispatch) => {
//         dispatch(setAppStatus({ status: true }))
//         teamsAPI
//             .addTeam(data)
//             .then((res) => {
//                 if (res.request.status === 200) {
//                     navigate(-1)
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response)
//             })
//             .finally(() => {
//                 dispatch(setAppStatus({ status: false }))
//             })
//     }

    export const addTeam = createAsyncThunk(
        'teams/addTeam',
        async function({data, navigate}: addTeamProps, { dispatch, rejectWithValue}) {
            dispatch(setAppStatus({ status: true }))
        try {
            const response = await teamsAPI.addTeam(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            navigate(-1)
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR:", error.message)
                return rejectWithValue(error.message)
              }
            console.log("ERROR", error)
        } finally {
        dispatch(setAppStatus({ status: false }))
        }
        } 
    )

// export const getTeamInfoTC = (id: number) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({ status: true }))
//     teamsAPI
//         .getTeamInfo(id)
//         .then((res) => {
//             if (res.request.status === 200) {
//                 dispatch(setTeamInfo(res.data))
//             }
//         })
//         .catch((error) => {
//             console.log(error.response)
//         })
//         .finally(() => {
//             dispatch(setAppStatus({ status: false }))
//         })
// }

export const getTeamInfo = createAsyncThunk(
    'teams/getTeamInfo',
    async function(id: number, { dispatch, rejectWithValue}) {
        dispatch(setAppStatus({ status: true }))
    try {
        const response = await teamsAPI.getTeamInfo(id)
        if (response.status !== 200) {
            throw new Error('Server Error!')
        }
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            console.log("ERROR:", error.message)
            return rejectWithValue(error.message)
          }
        console.log("ERROR", error)
    } finally {
    dispatch(setAppStatus({ status: false }))
    }
    } 
)

// export const updateTeamTC =
//     (data: TeamDto, navigate: NavigateFunction) => (dispatch: Dispatch) => {
//         dispatch(setAppStatus({ status: true }))
//         teamsAPI
//             .updateTeam(data)
//             .then((res) => {
//                 if (res.request.status === 200) {
//                     dispatch(setTeamInfo(res.data))
//                     navigate(-1)
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response)
//             })
//             .finally(() => {
//                 dispatch(setAppStatus({ status: false }))
//             })
//     }

    export const updateTeam = createAsyncThunk(
        'teams/updateTeam',
        async function({data, navigate}: updateTeamProps, { dispatch, rejectWithValue}) {
            dispatch(setAppStatus({ status: true }))
        try {
            const response = await teamsAPI.updateTeam(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            navigate(-1)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                console.log("ERROR:", error.message)
                return rejectWithValue(error.message)
              }
            console.log("ERROR", error)
        } finally {
        dispatch(setAppStatus({ status: false }))
        }
        } 
    )

// export const deleteTeamTC = (id: number) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({ status: true }))
//     teamsAPI
//         .deleteTeam(id)
//         .then((res) => {
//             if (res.request.status === 200) {
//                 dispatch(
//                     setTeamInfo({
//                         name: '',
//                         foundationYear: 0,
//                         division: '',
//                         conference: '',
//                         imageUrl: '',
//                         id: 0
//                     })
//                 )
//             }
//         })
//         .catch((error) => {
//             console.log(error.response)
//         })
//         .finally(() => {
//             dispatch(setAppStatus({ status: false }))
//         })
// }

export const deleteTeam = createAsyncThunk(
    'teams/deleteTeam',
    async function(id: number, { dispatch, rejectWithValue}) {
        dispatch(setAppStatus({ status: true }))
    try {
        const response = await teamsAPI.deleteTeam(id)
        if (response.status !== 200) {
            throw new Error('Server Error!')
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log("ERROR:", error.message)
            return rejectWithValue(error.message)
          }
        console.log("ERROR", error)
    } finally {
    dispatch(setAppStatus({ status: false }))
    }
    } 
)

type fetchTeamsProps = {
    searchTeam: string 
    page: number
    pageSize :number
}
type addTeamProps = {
    data: NewTeamDto 
    navigate: NavigateFunction
}
type updateTeamProps = {
    data: TeamDto 
    navigate: NavigateFunction
}