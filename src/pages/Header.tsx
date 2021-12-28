import React from 'react';
import { NavLink } from 'react-router-dom'
import { PATH } from './Routs';

export const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
          </li>
          <li>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}


