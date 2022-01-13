import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../core/redux/store";
import { authTC } from "../../modules/auth/authorizationThunk";
import styles from './Login.module.css'
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

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

          <input className={styles.input} disabled={isLoading} type="submit" value="Sign In" />
          <div className={styles.authSign}>
            <span className={styles.spanMember}>Not a member yet?</span>
            <NavLink to={PATH.REGISTRATION} className={styles.pathLink}>Sign Up</NavLink>
          </div>

        </form>
      </div>

      <div className={styles.fonts}>
        <img src={iconFont} className={styles.imageBlock} alt="icon" />
      </div>
    </div>
  );
}