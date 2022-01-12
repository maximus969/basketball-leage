import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from "./auth/Login";
import { Registration } from "./auth/Registration";
import { Team } from "./main/content/Team/Team";
import { useSelector } from 'react-redux';
import { AppRootStateType } from "../core/redux/store";


export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  TEAM: '/team',
}

export const Routs = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route
          path={PATH.TEAM}
          element={
            <RequireAuth isLoggedIn={isLoggedIn} >
              <Team />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  )
}

const RequireAuth = (props: any) => {
  return props.isLoggedIn ? props.children : <Navigate to={PATH.LOGIN} />;
}