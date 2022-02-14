import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamDtoPageResult } from '../../api/dto/ITeam'

const initialState = {
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
}

const slice = createSlice({
    name: 'teams',
    initialState: initialState,
    reducers: {
        setTeamsData(state, action: PayloadAction<TeamDtoPageResult>) {
            return { ...action.payload }
        }
    }
})

export const teamsReducer = slice.reducer
export const { setTeamsData } = slice.actions
