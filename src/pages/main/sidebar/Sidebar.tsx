import { useDispatch } from 'react-redux'
import { signOut } from '../../../modules/auth/authorizationSlise'
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
        <div>
          teams
        </div>
        <div onClick={signOutHandler}>
          sign out
        </div>
      </div>
    </div>
  )
}