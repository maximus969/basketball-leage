import { Dispatch } from 'redux'
import {
    authAPI,
    LoginRequestData,
    RegistrationRequestData
} from '../../api/dto/IAuthorization'
import { setAppStatus } from '../app/appSlice'
import { setUserData } from './authorizationSlice'
import { saveState } from './../../utils/localStorage'

export const authTC = (data: LoginRequestData) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    authAPI
        .login(data)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(setUserData(res.data))
                saveState('state', res.data)
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
        .finally(() => {
            dispatch(setAppStatus({ status: false }))
        })
}

export const registerTC =
    (data: RegistrationRequestData) => (dispatch: Dispatch) => {
        dispatch(setAppStatus({ status: true }))
        authAPI
            .regUser(data)
            .then((res) => {
                if (res.request.status === 200) {
                    dispatch(setUserData(res.data))
                    saveState('state', res.data)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => {
                dispatch(setAppStatus({ status: false }))
            })
    }
