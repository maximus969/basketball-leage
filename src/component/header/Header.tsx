import React, { FC } from 'react'
import logo from '../../assets/icon/logo.png'
import profileIcon from '../../assets/icon/profileIcon.svg'
import styles from './Header.module.css'
import { restoreFromLocalStorage } from '../../utils/localStorage'

export const Header: FC = () => {

    const name = restoreFromLocalStorage('name')

    return (
        <div className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoBlock}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <div className={styles.profileData}>
                    <span className={styles.name}>{name}</span>
                    <img
                        className={styles.profileIcon}
                        src={profileIcon}
                        alt="profileIcon"
                    />
                </div>
            </div>
        </div>
    )
}
