import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../core/redux/store";
import { registerTC } from "../../modules/auth/authorizationThunk";
import styles from './Login.module.css'
import { Navigate, NavLink } from "react-router-dom";
import { PATH } from "../routes";
import { ReactComponent as IconFont } from '../../assets/icon/Group1.svg'
import { InputContainer } from "../../ui/InputContainer/InputContainer";
import { Button } from "../../ui/Button/Button";

interface IFormInputs {
  userName: string
  login: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export const Registration: React.FC = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.status)

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
    return <Navigate replace to={PATH.TEAMS} />
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.authContainer}>
        <div className={styles.registerBlock}>
          <h2 className={styles.title}>Sign Up</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputContainer name={'userName'} register={register} label={'Name'} errors={errors.userName?.message} />
            <InputContainer name={'login'} register={register} label={'Login'} errors={errors.login?.message} />
            <InputContainer name={'password'} register={register} label={'Password'} errors={errors.password?.message} type={'password'} />
            <InputContainer name={'confirmPassword'} register={register} label={'Enter your password again'} errors={errors.password?.message} type={'password'} />
            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxBlock}>
                <input type='checkbox' {...register('acceptTerms')} className={styles.checkbox} />
                <span className={styles.checkboxText}>I accept the agreement</span>
              </div>
              {errors?.acceptTerms && <span className={styles.errorMessage}>{errors.acceptTerms.message}</span>}
            </div>

            <div className={styles.buttonContainer}>
              <Button name={'Sign Up'} type={'submit'} disabled={isLoading} />
            </div>

            <div className={styles.authSign}>
              <span className={styles.spanMember}>Already a member?</span>
              <NavLink to={PATH.LOGIN} className={styles.pathLink}>Sign In</NavLink>
            </div>

          </form>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <IconFont className={styles.imageBlock} />
      </div>

    </div>
  );
}