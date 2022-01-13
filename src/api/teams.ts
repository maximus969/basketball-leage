import { fetchAPI } from "./baseRequest";

export const teamsAPI = {
  getTeams({ page, pageSize }: GetTeamsRequestData) {
    return fetchAPI().get<TeamDtoPageResult>(
      `Team/GetTeams?Page=${page}&PageSize=${pageSize}`
    );
  },
  addTeam(data: NewTeamDto) {
    return fetchAPI().post<TeamDto>(`Team/Add`, data);
  },
  getTeam(id: number) {
    return fetchAPI().get<TeamDto>(`Team/Get?id=${id}`);
  },
  updateTeam(data: TeamDto) {
    return fetchAPI().put<TeamDto>(`Team/Update`, data);
  },
  deleteTeam(id: number) {
    return fetchAPI().delete<TeamDto>(`Team/Delete?id=${id}`);
  },
};

interface GetTeamsRequestData {
  page: number;
  pageSize: number;
}

interface TeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id: number;
}

interface TeamDtoPageResult {
  data: TeamDto[];
  count: number;
  page: number;
  size: number;
}

interface NewTeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}
