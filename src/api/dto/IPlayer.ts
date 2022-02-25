import { fetchAPI } from '../baseRequest'

export const playersAPI = {
    getPlayers(name: string, id: number[], page: number, pageSize: number) {
        const teamsId = '&' + id.map((el) => `TeamIds=${el}`).join('&')
        const finalId = id.length === 0 ? '' : teamsId
        return fetchAPI().get<PlayerDtoPageResult>(
            `Player/GetPlayers?Name=${name}${finalId}&Page=${page}&PageSize=${pageSize}`
        )
    },
    getPlayerInfo(id: number) {
        return fetchAPI().get<PlayerTeamNameDto>(`Player/Get?id=${id}`)
    },
    getPositions() {
        return fetchAPI().get<string[]>('Player/GetPositions')
    },
    addPlayer(data: NewPlayerDto) {
        return fetchAPI().post<PlayerDto>('Player/Add', data)
    },
    updatePlayer(data: PlayerDto) {
        return fetchAPI().put<PlayerDto>('Player/Update', data)
    },
    deletePlayer(id: number) {
        return fetchAPI().delete<PlayerDto>(`Player/Delete?id=${id}`)
    }
}

export interface PlayerDto {
    name: string
    number: number
    position: string
    team: number
    birthday: string
    height: number
    weight: number
    avatarUrl: string
    id: number
}

export interface PlayerDtoPageResult {
    data: PlayerDto[]
    count: number
    page: number
    size: number
}

export interface PlayerTeamNameDto {
    name: string
    number: number
    position: string
    team: number
    birthday: string
    height: number
    weight: number
    avatarUrl: string
    id: number
    teamName: string
}

export interface NewPlayerDto {
    name: string
    number: number
    position: string
    team: number
    birthday: string
    height: number
    weight: number
    avatarUrl: string
}
