import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamDto } from "./../../api/teams";

const initialState = {
  name: "",
  foundationYear: 0,
  division: "",
  conference: "",
  imageUrl: "",
  id: 0,
};

const slice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeamInfo(state, action: PayloadAction<TeamDto>) {
      return { ...action.payload };
    },
  },
});

export const teamReducer = slice.reducer;
export const { setTeamInfo } = slice.actions;
