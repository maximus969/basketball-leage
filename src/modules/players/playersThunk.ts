import { Dispatch } from "redux";
import { playersAPI } from "../../api/players";
import { setAppStatus } from "../app/appSlice";
import { setPlayersData } from "./playersSlice";

export const getPlayersTC =
  (name: string, id: number, page: number, pageSize: number) =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: true }));
    playersAPI
      .getPlayers(name, id, page, pageSize)
      .then((res) => {
        if (res.request.status === 200) {
          dispatch(setPlayersData(res.data));
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: false }));
      });
  };
