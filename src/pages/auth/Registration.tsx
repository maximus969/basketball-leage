import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../core/redux/store";
import { registerTC } from "../../modules/auth/authorizationThunk";
import styles from './Login.module.css'
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Name</label>
            <input className={styles.input} {...register('userName')} />
            {errors?.userName && <span className={styles.error}>{errors.userName.message}</span>}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Login</label>
            <input className={styles.input} {...register('login')} />
            {errors?.login && <span className={styles.error}>{errors.login.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputStyles}>
              <input className={styles.input} type={showPassword ? 'text' : 'password'} {...register('password')} />
              <div className={styles.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
                <img src={showPassword ? eyeRoundedIcon : closeEyeRoundedIcon} alt="icon" />
              </div>
            </div>
            {errors?.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Enter your password again</label>
            <div className={styles.inputStyles}>
              <input className={styles.input} type={showRepeatPassword ? 'text' : 'password'} {...register('confirmPassword')} />
              <div className={styles.passwordIcon} onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                <img src={showRepeatPassword ? eyeRoundedIcon : closeEyeRoundedIcon} alt="icon" />
              </div>
            </div>
            {errors?.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
          </div>

          <div>
            <input type='checkbox' {...register('acceptTerms')} />
            <span>I accept the agreement</span>
            {errors?.acceptTerms && <span className={styles.error}>{errors.acceptTerms.message}</span>}
          </div>
          <input className={styles.input} disabled={isLoading} type="submit" value="Sign Up" />

          <div className={styles.authSign}>
            <span className={styles.spanMember}>Already a member?</span>
            <NavLink to={PATH.LOGIN} className={styles.pathLink}>Sign In</NavLink>
          </div>
        </form>
      </div>

      <div className={styles.fonts}>
        <img src={iconFont} alt="icon" />
      </div>
    </div>
  );
}