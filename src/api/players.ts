import { fetchAPI } from "./baseRequest";

export const playersAPI = {
  getPlayers(name: string, id: number, page: number, pageSize: number) {
    return fetchAPI().get<PlayerDtoPageResult>(
      `Player/GetPlayers?Name=${name}&TeamIds=${id}&Page=${page}&PageSize=${pageSize}`
    );
  },
};

export interface PlayerDto {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export interface PlayerDtoPageResult {
  data: PlayerDto[];
  count: number;
  page: number;
  size: number;
}

export interface PlayerTeamNameDto {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
  teamName: string;
}

export interface NewPlayerDto {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
}
