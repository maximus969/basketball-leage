import { Dispatch } from "redux";
import {
  authAPI,
  LoginRequestData,
  RegistrationRequestData,
} from "../../api/auth";
import { setAppStatus } from "../app/appSlise";
import { setUserData } from "./authorizationSlise";

export const authTC = (data: LoginRequestData) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: true }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.request.status === 200) {
        dispatch(setUserData(res.data));
        localStorage.setItem("token", res.data.token);
      }
    })
    .catch((error) => {
      console.log(error.response);
    })
    .finally(() => {
      dispatch(setAppStatus({ status: false }));
    });
};

export const registerTC =
  (data: RegistrationRequestData) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }));
    authAPI
      .regUser(data)
      .then((res) => {
        if (res.request.status === 200) {
          dispatch(setUserData(res.data));
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: false }));
      });
  };
