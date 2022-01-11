import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../core/redux/store";
import { registerTC } from "../../modules/auth/authorizationThunk";
import s from './Login.module.css'
import { Navigate, NavLink } from "react-router-dom";
import { PATH } from "../Routs";
import eyeRoundedIcon from '../../assets/icon/eyeRounded.svg'
import closeEyeRoundedIcon from '../../assets/icon/closeEyeRounded.svg'
import iconFont from '../../assets/icon/Group1.svg'

interface IFormInputs {
  userName: string
  login: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export const Registration = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.status)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Name is required'),
    login: Yup.string()
      .required('Login is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Agreement is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>(formOptions);
  const onSubmit = (data: IFormInputs) => {
    dispatch(registerTC({
      userName: data.userName,
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
        <h2 className={s.title}>Sign Up</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputContainer}>
            <label className={s.label}>Name</label>
            <input className={s.input} {...register('userName')} />
            {errors?.userName && <span className={s.error}>{errors.userName.message}</span>}
          </div>
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

          <div className={s.inputContainer}>
            <label className={s.label}>Enter your password again</label>
            <div className={s.inputStyles}>
              <input className={s.input} type={showRepeatPassword ? 'text' : 'password'} {...register('confirmPassword')} />
              <div className={s.passwordIcon} onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                <img src={showRepeatPassword ? eyeRoundedIcon : closeEyeRoundedIcon} alt="icon" />
              </div>
            </div>
            {errors?.confirmPassword && <span className={s.error}>{errors.confirmPassword.message}</span>}
          </div>

          <div>
            <input type='checkbox' {...register('acceptTerms')} />
            <span>I accept the agreement</span>
            {errors?.acceptTerms && <span className={s.error}>{errors.acceptTerms.message}</span>}
          </div>
          <input className={s.input} disabled={isLoading} type="submit" value="Sign Up" />

          <div className={s.authSign}>
            <span className={s.spanMember}>Already a member?</span>
            <NavLink to={PATH.LOGIN} className={s.pathLink}>Sign In</NavLink>
          </div>
        </form>
      </div>

      <div className={s.fonts}>
        <img src={iconFont} alt="icon" />
      </div>
    </div>
  );
}