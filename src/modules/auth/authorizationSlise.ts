import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponseType } from "../../api/auth";

const initialState = {
  isLoggedIn: false,
  name: "",
  avatarUrl: "",
  token: "",
};

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUserData(state, action: PayloadAction<LoginResponseType>) {
      return { ...action.payload, isLoggedIn: true };
    },
  },
});

export const authReducer = slice.reducer;
export const { setUserData } = slice.actions;
