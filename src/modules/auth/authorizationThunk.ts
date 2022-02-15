import { Dispatch } from 'redux'
import {
    authAPI,
    LoginRequestData,
    RegistrationRequestData
} from '../../api/dto/IAuthorization'
import { setAppStatus } from '../app/appSlice'
import { setUserData } from './authorizationSlice'
import { saveInLocalStorage } from './../../utils/localStorage'

export const authTC = (data: LoginRequestData) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }))
    authAPI
        .login(data)
        .then((res) => {
            if (res.request.status === 200) {
                saveInLocalStorage('token', res.data.token)
                saveInLocalStorage('name', res.data.name)
                saveInLocalStorage('avatarUrl', res.data.avatarUrl)
                dispatch(setUserData())
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
                    saveInLocalStorage('token', res.data.token)
                    saveInLocalStorage('name', res.data.name)
                    saveInLocalStorage('avatarUrl', res.data.avatarUrl)
                    dispatch(setUserData())
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => {
                dispatch(setAppStatus({ status: false }))
            })
    }
