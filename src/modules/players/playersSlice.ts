import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerDtoPageResult, PlayerTeamNameDto } from '../../api/dto/IPlayer'

const initialState = {
    players: {
        data: [
            {
                name: '',
                number: 0,
                position: '',
                team: 0,
                birthday: '',
                height: 0,
                weight: 0,
                avatarUrl: '',
                id: 0
            }
        ],
        count: 0,
        page: 1,
        size: 6
    },
    player: {
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
    },
}

const slice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {
        setPlayersData(state, action: PayloadAction<PlayerDtoPageResult>) {
            state.players = action.payload
        },
        setPlayerData(state, action: PayloadAction<PlayerTeamNameDto>) {
            state.player = action.payload
        },
    }
})

export const playersReducer = slice.reducer
export const { setPlayersData, setPlayerData } = slice.actions
