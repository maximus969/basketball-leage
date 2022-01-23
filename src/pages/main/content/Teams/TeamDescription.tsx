import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import wrapper from '../Content.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamTC, getTeamInfoTC } from './../../../../modules/teams/teamsThunk';
import { AppRootStateType } from '../../../../core/redux/store';

export const TeamDescription: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const name = useSelector<AppRootStateType, string>(state => state.team.name)
  const conference = useSelector<AppRootStateType, string>(state => state.team.conference)
  const division = useSelector<AppRootStateType, string>(state => state.team.division)
  const foundationYear = useSelector<AppRootStateType, number>(state => state.team.foundationYear)

  useEffect(() => {
    dispatch(getTeamInfoTC(Number(id)))
  }, [])

  const deleteTeam = () => {
    dispatch(deleteTeamTC(Number(id)))
    navigate(-1)
  }
  const updateTeam = () => {
    navigate(`/teams/${id}/update-team`)
  }

  return (
    <div className={wrapper.mainContent}>
      <div>
        <button onClick={updateTeam}>update</button>
        <button onClick={deleteTeam}>delete</button>
        <div>
          {name}
        </div>
        <div>
          {conference}
        </div>
        <div>
          {division}
        </div>
        <div>
          {foundationYear}
        </div>
      </div>
    </div>
  )
}