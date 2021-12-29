import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../core/redux/store";
import { authTC } from "../modules/auth/authorizationThunk";
import s from './Login.module.css'

interface IFormInputs {
  login: string
  password: string
}

export const Login = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.status)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    dispatch(authTC({
      login: data.login,
      password: data.password
    }))
  };

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className={s.container}>
      <h2>Sign In</h2>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label className={s.label}>Login</label>
          <input className={s.input} {...register('login', { required: true })} />
          {errors?.login && <p className={s.error}>{errors.login.message}</p>}
        </div>

        <div>
          <label className={s.label}>Password</label>
          <input className={s.input} type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} />
          <div onClick={() => setShowPassword(!showPassword)}>show password</div>
          {errors?.password && <p className={s.error}>{errors.password.message}</p>}
        </div>

        <input className={s.input} type="submit" value="Sign In" />

      </form>
    </div>
  );
}