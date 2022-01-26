import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import wrapper from '../../Content.module.css'
import styles from './TeamInfo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamTC, getTeamInfoTC } from '../../../../../modules/teams/teamsThunk';
import { AppRootStateType } from '../../../../../core/redux/store';
import deleteIcon from '../../../../../assets/icon/delete_rounded.svg'
import updateIcon from '../../../../../assets/icon/create_rounded.svg'

export const TeamDescription: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const name = useSelector<AppRootStateType, string>(state => state.team.name)
  const conference = useSelector<AppRootStateType, string>(state => state.team.conference)
  const division = useSelector<AppRootStateType, string>(state => state.team.division)
  const foundationYear = useSelector<AppRootStateType, number>(state => state.team.foundationYear)
  const imageUrl = useSelector<AppRootStateType, string>(state => state.team.imageUrl)

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
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.iconsContainer}>
            <div onClick={updateTeam}>
              <img src={updateIcon} alt='update' />
            </div>
            <div onClick={deleteTeam}>
              <img src={deleteIcon} alt='delete' />
            </div>
          </div>
        </div>

        <div className={styles.teamInfoContainer}>
          <div className={styles.imgBlock}>
            <img className={styles.img} src={imageUrl} />
          </div>

          <div className={styles.textInfoBlock}>
            <div className={styles.textInfo}>
              <h2 className={styles.title}>
                {name}
              </h2>
              <div>
                <div>
                  <label className={styles.label}>Conference</label>
                  <p className={styles.text}>{conference}</p>
                </div>
                <div>
                  <label className={styles.label}>Division</label>
                  <p className={styles.text}>{division}</p>
                </div>
                <div>
                  <label className={styles.label}>Year of foundation</label>
                  <p className={styles.text}>{foundationYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}