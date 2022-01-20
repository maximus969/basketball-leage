import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../Content.module.css'
import { getTeamsTC } from '../../../../modules/teams/teamsThunk';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../../core/redux/store';
import { TeamDto } from '../../../../api/teams';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes';
import { useState } from 'react';
import { getTeamInfoTC } from './../../../../modules/teams/teamsThunk';

export const Teams: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const page = useSelector<AppRootStateType, number>(state => state.teams.page)
  const pageSize = useSelector<AppRootStateType, number>(state => state.teams.size)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const teams = useSelector<AppRootStateType, TeamDto[]>(state => state.teams.data)
  const [searchTeam, setSearchTeam] = useState<string>('')
  useEffect(() => {
    if (!searchTeam) {
      dispatch(getTeamsTC(searchTeam, page, pageSize))
    }
  }, [searchTeam])
  const addTeamHandler = () => {
    navigate(PATH.ADD_TEAMS)
  }
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTeam(e.currentTarget.value)
  }
  const startSearchingTeam = () => {
    dispatch(getTeamsTC(searchTeam, page, pageSize))
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.mainBlock}>
        <div className={styles.searchBlock}>
          <div>
            <input onChange={onSearchChange} />
            <button onClick={startSearchingTeam}>+</button>
          </div>
          <button onClick={addTeamHandler}>add team</button>
        </div>

        <div>
          {
            teams.map(item => {
              const showTeamInfo = () => {
                navigate(`${item.id}`)
              }
              return (
                <div onClick={showTeamInfo} key={item.id}>{item.name}</div>
              )
            })
          }
        </div>

        <div>
          paginate
        </div>
      </div>
    </div>
  )
}