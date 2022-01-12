import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../core/redux/store';
import logo from '../../../assets/icon/logo.png'
import profileIcon from '../../../assets/icon/profileIcon.svg'
import s from './Header.module.css'

export const Header = () => {
  const name = useSelector<AppRootStateType, string>(state => state.auth.name)

  return (
    <div className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.logoBlock}>
          <img className={s.logo} src={logo} alt='logo' />
        </div>
        <div className={s.profileData}>
          <span>{name}</span>
          <img className={s.profileIcon} src={profileIcon} alt='profileIcon' />
        </div>
      </div>
    </div>
  )
}


