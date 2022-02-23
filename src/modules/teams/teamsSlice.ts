import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamDto, TeamDtoPageResult } from '../../api/dto/ITeam'
import { deleteTeam, fetchTeams, getTeamInfo, updateTeam } from './teamsThunk'

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.fulfilled, (state, action) => {
                if (action && action.payload) {
                    state.teams = action.payload
                }
            })
            .addCase(getTeamInfo.fulfilled, (state, action) => {
                if (action && action.payload) {
                    state.team = action.payload
                }
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                if (action && action.payload) {
                    state.team = action.payload
                }
            })
            .addCase(deleteTeam.fulfilled, (state) => {
                state.team = initialState.team
            })
    }
})

export const teamsReducer = slice.reducer
export const { setTeamsData, setTeamInfo } = slice.actions
