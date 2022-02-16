import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamDto, TeamDtoPageResult } from '../../api/dto/ITeam'

const initialState = {
    teams: {
        data: [
            {
                name: '',
                foundationYear: 0,
                division: '',
                conference: '',
                imageUrl: '',
                id: 0
            }
        ],
        count: 0,
        page: 1,
        size: 6
    },
    team: {
        name: '',
        foundationYear: 0,
        division: '',
        conference: '',
        imageUrl: '',
        id: 0
    }
}

const slice = createSlice({
    name: 'teams',
    initialState: initialState,
    reducers: {
        setTeamsData(state, action: PayloadAction<TeamDtoPageResult>) {
            state.teams = action.payload
        },
        setTeamInfo(state, action: PayloadAction<TeamDto>) {
            state.team = action.payload
        }
    }
})

export const teamsReducer = slice.reducer
export const { setTeamsData } = slice.actions
export const { setTeamInfo } = slice.actions
