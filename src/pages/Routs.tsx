import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Login } from "./Login";
import { Registration } from "./Registration";

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
}

export const Routs = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
      </Routes>
    </div>
  )
}