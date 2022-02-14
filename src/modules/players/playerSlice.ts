import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    PlayerDto,
    PlayerDtoPageResult,
    PlayerTeamNameDto
} from '../../api/dto/IPlayer'

const initialState = {
    name: '',
    number: 0,
    position: '',
    team: 0,
    birthday: '',
    height: 0,
    weight: 0,
    avatarUrl: '',
    id: 0,
    teamName: ''
}

const slice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setPlayerData(state, action: PayloadAction<PlayerTeamNameDto>) {
            return { ...action.payload }
        }
        // setUpdatedPlayerData(state, action: PayloadAction<PlayerDto>) {
        //   return { ...action.payload };
        // },
    }
})

export const playerReducer = slice.reducer
export const { setPlayerData } = slice.actions
// export const { setUpdatedPlayerData } = slice.actions;
