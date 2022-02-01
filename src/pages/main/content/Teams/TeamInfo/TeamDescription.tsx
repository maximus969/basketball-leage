import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import wrapper from '../../Content.module.css'
import styles from './TeamInfo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamTC, getTeamInfoTC } from '../../../../../modules/teams/teamsThunk';
import { AppRootStateType } from '../../../../../core/redux/store';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icon/delete_rounded.svg'
import updateIcon from '../../../../../assets/icon/create_rounded.svg'
import { getPlayersTC } from '../../../../../modules/players/playersThunk';
import { PlayerDto } from '../../../../../api/players';
import { ageCounter } from '../../../../../utils/ageCounter';

export const TeamDescription: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const name = useSelector<AppRootStateType, string>(state => state.team.name)
  const conference = useSelector<AppRootStateType, string>(state => state.team.conference)
  const division = useSelector<AppRootStateType, string>(state => state.team.division)
  const foundationYear = useSelector<AppRootStateType, number>(state => state.team.foundationYear)
  const imageUrl = useSelector<AppRootStateType, string>(state => state.team.imageUrl)
  const teamsPlayers = useSelector<AppRootStateType, PlayerDto[]>(state => state.players.data)


  useEffect(() => {
    dispatch(getTeamInfoTC(Number(id)))
    dispatch(getPlayersTC('', Number(id), 1, 7))
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
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.iconsContainer}>
              <div onClick={updateTeam}>
                <img src={updateIcon} alt='update' />
              </div>
              <div onClick={deleteTeam}>
                <DeleteIcon className={styles.deleteIcon} />
              </div>
            </div>
          </div>

          <div className={styles.teamInfoContainer}>
            <div className={styles.imgBlock}>
              <img className={styles.img} src={imageUrl} />
            </div>

            <div className={styles.textInfoBlock}>
              <div className={styles.textInfo}>
                <div>
                  <h2 className={styles.title}>
                    {name}
                  </h2>
                </div>

                <div className={styles.description}>
                  <div className={styles.descriptionBlock}>
                    <label className={styles.label}>Conference</label>
                    <p className={styles.text}>{conference}</p>
                  </div>
                  <div className={styles.descriptionBlock}>
                    <label className={styles.label}>Division</label>
                    <p className={styles.text}>{division}</p>
                  </div>
                  <div className={styles.descriptionBlock}>
                    <label className={styles.label}>Year of foundation</label>
                    <p className={styles.text}>{foundationYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr className={styles.th1}>
                <th className={styles.headerName} colSpan={5}>Roster</th>
              </tr>
              <tr className={styles.headerAtributes}>
                <th className={styles.th1}>#</th>
                <th className={styles.th1}>Player</th>
                <th className={styles.th1}>Height</th>
                <th className={styles.th1}>Weight</th>
                <th className={styles.th1}>Age</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {teamsPlayers.map((player) => {
                return (
                  <tr key={player.id} className={styles.bodyAtributes}>
                    <td className={styles.bodyCell}>  {player.number}</td>
                    <td className={styles.bodyCell}>
                      <div className={styles.playerInfoBlock}>
                        <img src={player.avatarUrl} className={styles.playerImg} alt='' />
                        <div className={styles.playerInfo}>
                          <span className={styles.playerInfoName}>{player.name}</span>
                          <span className={styles.playerInfoPosition}>{player.position}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.bodyCell}> {player.height} cm</td>
                    <td className={styles.bodyCell}> {player.weight} kg</td>
                    <td className={styles.bodyCell}> {ageCounter(player.birthday)} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}