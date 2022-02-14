import { fetchAPI } from '../baseRequest'

export const teamsAPI = {
    getTeams(name: string, page: number, pageSize: number) {
        return fetchAPI().get<TeamDtoPageResult>(
            `Team/GetTeams?Name=${name}&Page=${page}&PageSize=${pageSize}`
        )
    },
    addTeam(data: NewTeamDto) {
        return fetchAPI().post<TeamDto>('Team/Add', data)
    },
    getTeamInfo(id: number) {
        return fetchAPI().get<TeamDto>(`Team/Get?id=${id}`)
    },
    updateTeam(data: TeamDto) {
        return fetchAPI().put<TeamDto>('Team/Update', data)
    },
    deleteTeam(id: number) {
        return fetchAPI().delete<TeamDto>(`Team/Delete?id=${id}`)
    }
}

export interface GetTeamsRequestData {
    name: string
    page: number
    pageSize: number
}

export interface TeamDto {
    name: string
    foundationYear: number
    division: string
    conference: string
    imageUrl: string
    id: number
}

export interface TeamDtoPageResult {
    data: TeamDto[]
    count: number
    page: number
    size: number
}

export interface NewTeamDto {
    name: string
    foundationYear: number
    division: string
    conference: string
    imageUrl: string
}
