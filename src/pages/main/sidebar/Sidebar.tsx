import { useDispatch } from 'react-redux'
import { signOut } from '../../../modules/auth/authorizationSlice'
import logout from '../../../assets/icon/logout.svg'
import teams from '../../../assets/icon/teams.svg'
import players from '../../../assets/icon/players.svg'
import styles from './Sidebar.module.css'

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signOut({
      name: "",
      avatarUrl: "",
      token: "",
    }));
    localStorage.removeItem("state");
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <div className={styles.navBlock}>
          <div className={styles.itemsBlock}>
            <img className={styles.icon} src={teams} alt='teams' />
            <span className={styles.text}>Teams</span>
          </div>
          <div className={styles.itemsBlock}>
            <img className={styles.icon} src={players} alt='players' />
            <span className={styles.text}>Players</span>
          </div>
        </div>
        <div className={`${styles.itemsBlock}`} onClick={signOutHandler}>
          <img className={styles.icon} src={logout} alt='logout' />
          <span className={styles.text}>Sign out</span>
        </div>
      </div>
    </div>
  )
}