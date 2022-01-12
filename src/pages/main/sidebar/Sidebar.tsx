import { useDispatch } from 'react-redux'
import { signOut } from '../../../modules/auth/authorizationSlise'
import logout from '../../../assets/icon/logout.svg'
import teams from '../../../assets/icon/teams.svg'
import players from '../../../assets/icon/players.svg'
import s from './Sidebar.module.css'

export const Sidebar = () => {
  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signOut({
      name: "",
      avatarUrl: "",
      token: "",
    }));
  }

  return (
    <div className={s.sidebar}>
      <div className={s.sidebarContainer}>
        <div className={s.navBlock}>
          <div className={s.itemsBlock}>
            <img className={s.icon} src={teams} alt='teams' />
            <span className={s.text}>Teams</span>
          </div>
          <div className={s.itemsBlock}>
            <img className={s.icon} src={players} alt='players' />
            <span className={s.text}>Players</span>
          </div>
        </div>
        <div className={s.itemsBlock} onClick={signOutHandler}>
          <img className={s.icon} src={logout} alt='logout' />
          <span className={s.text}>Sign out</span>
        </div>
      </div>
    </div>
  )
}