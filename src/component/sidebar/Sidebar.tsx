import { useDispatch } from 'react-redux'
import { signOut } from '../../modules/auth/authorizationSlice'
import { ReactComponent as Logout } from '../../assets/icon/logout.svg'
import { ReactComponent as TeamsIcon } from '../../assets/icon/teams.svg'
import { ReactComponent as PlayersIcon } from '../../assets/icon/players.svg'
import profileIcon from '../../assets/icon/profileIcon.svg'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../pages/routes'
import { FC, useState } from 'react'
import { restoreFromLocalStorage } from '../../utils/localStorage'

export const Sidebar: FC = () => {
    const dispatch = useDispatch()
    const [isTeamTabActive, setIsTeamTabActive] = useState(true)
    const [isPlayersTabActive, setIsPlayersTabActive] = useState(false)
    const name = restoreFromLocalStorage('name')

    const signOutHandler = () => {
        dispatch(signOut())
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('avatarUrl')
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
        <>
            <input
                type={'checkbox'}
                className={styles.menuToggle}
                id="menu-toggle"
            />
            <label className={styles.menuLabel} htmlFor="menu-toggle">
                <span></span>
            </label>

            <div className={styles.sidebar}>
                <div className={styles.profileData}>
                    <img
                        className={styles.profileIcon}
                        src={profileIcon}
                        alt="profileIcon"
                    />
                    <span className={styles.name}>{name}</span>
                </div>

                <div className={styles.line}></div>

                <div className={styles.sidebarContainer}>
                    <div className={styles.navBlock}>
                        <NavLink to={PATH.TEAMS} className={styles.navTab}>
                            <div
                                className={styles.itemsBlock}
                                onClick={onTeamTabClick}
                            >
                                <TeamsIcon
                                    className={`${styles.icon} ${
                                        isTeamTabActive ? styles.activeIcon : ''
                                    }`}
                                />
                                <span
                                    className={
                                        isTeamTabActive
                                            ? styles.activeNavTab
                                            : styles.text
                                    }
                                >
                                    Teams
                                </span>
                            </div>
                        </NavLink>

                        <NavLink to={PATH.PLAYERS} className={styles.navTab}>
                            <div
                                className={styles.itemsBlock}
                                onClick={onPlayersTabClick}
                            >
                                <PlayersIcon
                                    className={`${styles.icon} ${
                                        isPlayersTabActive
                                            ? styles.activeIcon
                                            : ''
                                    }`}
                                />
                                <span
                                    className={
                                        isPlayersTabActive
                                            ? styles.activeNavTab
                                            : styles.text
                                    }
                                >
                                    Players
                                </span>
                            </div>
                        </NavLink>
                    </div>
                    <div
                        className={`${styles.itemsBlock}`}
                        onClick={signOutHandler}
                    >
                        <Logout
                            className={`${styles.icon} ${styles.logoutIcon}`}
                        />
                        <span
                            className={`${styles.text} ${styles.signOutText}`}
                        >
                            Sign out
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
