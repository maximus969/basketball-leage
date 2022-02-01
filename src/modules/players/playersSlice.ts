import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerDtoPageResult } from "../../api/players";

const initialState = {
  data: [
    {
      name: "",
      number: 0,
      position: "",
      team: 0,
      birthday: "",
      height: 0,
      weight: 0,
      avatarUrl: "",
      id: 0,
    },
  ],
  count: 0,
  page: 1,
  size: 1,
};

const slice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    setPlayersData(state, action: PayloadAction<PlayerDtoPageResult>) {
      return { ...action.payload };
    },
  },
});

export const playersReducer = slice.reducer;
export const { setPlayersData } = slice.actions;
