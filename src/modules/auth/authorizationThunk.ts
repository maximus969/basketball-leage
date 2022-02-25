import { Dispatch } from 'redux'
import {
    authAPI,
    LoginRequestData,
    RegistrationRequestData
} from '../../api/dto/IAuthorization'
import { setAppStatus } from '../app/appSlice'
import { setUserData } from './authorizationSlice'
import { saveInLocalStorage } from './../../utils/localStorage'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginTC = createAsyncThunk(
    'auth/login',
    async function (data: LoginRequestData, { dispatch, rejectWithValue }) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await authAPI.login(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            saveInLocalStorage('token', response.data.token)
            saveInLocalStorage('name', response.data.name)
            saveInLocalStorage('avatarUrl', response.data.avatarUrl)
            dispatch(setUserData())
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

export const registerTC = createAsyncThunk(
    'auth/register',
    async function (
        data: RegistrationRequestData,
        { dispatch, rejectWithValue }
    ) {
        dispatch(setAppStatus({ status: true }))
        try {
            const response = await authAPI.regUser(data)
            if (response.status !== 200) {
                throw new Error('Server Error!')
            }
            saveInLocalStorage('token', response.data.token)
            saveInLocalStorage('name', response.data.name)
            saveInLocalStorage('avatarUrl', response.data.avatarUrl)
            dispatch(setUserData())
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
