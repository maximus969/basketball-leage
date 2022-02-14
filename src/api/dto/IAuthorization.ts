import { fetchAPI } from '../baseRequest'

export const authAPI = {
    regUser(data: RegistrationRequestData) {
        return fetchAPI().post<LoginResponseType>('Auth/SignUp', data)
    },
    login(data: LoginRequestData) {
        return fetchAPI().post<LoginResponseType>('Auth/SignIn', data)
    }
}

export interface LoginRequestData {
    login: string
    password: string
}

export interface RegistrationRequestData extends LoginRequestData {
    userName: string
}

export interface LoginResponseType {
    name: string
    avatarUrl: string
    token: string
}
