import { useDispatch } from 'react-redux'
import { signOut } from '../../../modules/auth/authorizationSlice'
import { ReactComponent as Logout } from '../../../assets/icon/logout.svg'
import { ReactComponent as TeamsIcon } from '../../../assets/icon/teams.svg'
import { ReactComponent as PlayersIcon } from '../../../assets/icon/players.svg'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../routes';
import { useState } from 'react'

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const [isTeamTabActive, setIsTeamTabActive] = useState(true)
  const [isPlayersTabActive, setIsPlayersTabActive] = useState(false)


  const signOutHandler = () => {
    dispatch(signOut({
      name: "",
      avatarUrl: "",
      token: "",
    }));
    localStorage.removeItem("state");
  }

  const onTeamTabClick = () => {
    setIsTeamTabActive(true)
    setIsPlayersTabActive(false)
  }

  const onPlayersTabClick = () => {
    setIsPlayersTabActive(true)
    setIsTeamTabActive(false)
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <div className={styles.navBlock}>

          <NavLink to={PATH.TEAMS} className={styles.navTab}>
            <div className={styles.itemsBlock} onClick={onTeamTabClick}>
              <TeamsIcon className={`${styles.icon} ${isTeamTabActive ? styles.activeIcon : ''}`} />
              <span className={isTeamTabActive ? styles.activeNavTab : styles.text}>Teams</span>
            </div>
          </NavLink>

          <NavLink to={PATH.PLAYERS} className={styles.navTab}>
            <div className={styles.itemsBlock} onClick={onPlayersTabClick}>
              <PlayersIcon className={`${styles.icon} ${isPlayersTabActive ? styles.activeIcon : ''}`} />
              <span className={isPlayersTabActive ? styles.activeNavTab : styles.text}>Players</span>
            </div>
          </NavLink>

        </div>
        <div className={`${styles.itemsBlock}`} onClick={signOutHandler}>
          <Logout className={`${styles.icon} ${styles.logoutIcon}`} />
          <span className={`${styles.text} ${styles.signOutText}`}>Sign out</span>
        </div>
      </div>
    </div>
  )
}