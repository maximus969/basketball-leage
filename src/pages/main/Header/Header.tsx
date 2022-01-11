import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../core/redux/store';
import s from './Header.module.css'

export const Header = () => {
  const name = useSelector<AppRootStateType, string>(state => state.auth.name)

  return (
    <div className={s.header}>
      <div className={s.headerContainer}>
        <div>
          logo
        </div>
        <div className={s.profileData}>
          <span>{name}</span>
          <span>icon</span>
        </div>
      </div>
    </div>
  )
}


