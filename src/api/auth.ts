import axios from "axios";

const instance = axios.create({
  baseURL: "http://dev.trainee.dex-it.ru/api/",
});

export const authAPI = {
  regUser(data: RegistrationRequestData) {
    return instance.post<LoginResponseType>(`Auth/SignUp`, data, {
      headers: {
        "content-type": "text/json",
      },
    });
  },
  login(data: LoginRequestData) {
    return instance.post<LoginResponseType>(`Auth/SignIn`, data, {
      headers: {
        "content-type": "text/json",
      },
    });
  },
};

export interface LoginRequestData {
  login: string;
  password: string;
}

export interface RegistrationRequestData extends LoginRequestData {
  userName: string;
}

export interface LoginResponseType {
  name: string;
  avatarUrl: string;
  token: string;
}
