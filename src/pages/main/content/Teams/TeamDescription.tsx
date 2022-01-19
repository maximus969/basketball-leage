import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddTeam.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamTC } from './../../../../modules/teams/teamsThunk';
import { AppRootStateType } from '../../../../core/redux/store';
import { PATH } from '../../../routes';

export const TeamDescription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const id = useSelector<AppRootStateType, number>(state => state.team.id)
  const name = useSelector<AppRootStateType, string>(state => state.team.name)
  const conference = useSelector<AppRootStateType, string>(state => state.team.conference)
  const division = useSelector<AppRootStateType, string>(state => state.team.division)
  const foundationYear = useSelector<AppRootStateType, number>(state => state.team.foundationYear)

  useEffect(() => {
    if (!name) navigate(PATH.TEAMS)
  }, [name])

  const deleteTeam = () => {
    dispatch(deleteTeamTC(id))
  }
  const updateTeam = () => {
    navigate(`/teams/${id}/update-team`)
  }

  return (
    <div className={styles.mainContent}>
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