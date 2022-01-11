import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../core/redux/store";
import { authTC } from "../../modules/auth/authorizationThunk";
import s from './Login.module.css'
import eyeRoundedIcon from '../../assets/icon/eyeRounded.svg'
import closeEyeRoundedIcon from '../../assets/icon/closeEyeRounded.svg'
import iconFont from '../../assets/icon/Group.svg'
import { Navigate, NavLink } from "react-router-dom";
import { PATH } from "../Routs";


interface IFormInputs {
  login: string
  password: string
}

export const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.status)
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required('Login is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>(formOptions);

  const onSubmit = (data: IFormInputs) => {
    dispatch(authTC({
      login: data.login,
      password: data.password
    }))
  };

  if (isLoggedIn) {
    return <Navigate replace to={PATH.TEAM} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.title}>Sign In</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

          <div className={s.inputContainer}>
            <label className={s.label}>Login</label>
            <input className={s.input} {...register('login')} />
            {errors?.login && <span className={s.error}>{errors.login.message}</span>}
          </div>

          <div className={s.inputContainer}>
            <label className={s.label}>Password</label>
            <div className={s.inputStyles}>
              <input className={s.input} type={showPassword ? 'text' : 'password'} {...register('password')} />
              <div className={s.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
                <img src={showPassword ? eyeRoundedIcon : closeEyeRoundedIcon} alt="icon" />
              </div>
            </div>
            {errors?.password && <span className={s.error}>{errors.password.message}</span>}
          </div>

          <input className={s.input} disabled={isLoading} type="submit" value="Sign In" />
          <div className={s.authSign}>
            <span className={s.spanMember}>Not a member yet?</span>
            <NavLink to={PATH.REGISTRATION} className={s.pathLink}>Sign Up</NavLink>
          </div>

        </form>
      </div>

      <div className={s.fonts}>
        <img src={iconFont} className={s.imageBlock} alt="icon" />
      </div>
    </div>
  );
}