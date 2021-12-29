import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { registerTC } from "../modules/auth/authorizationThunk";
import s from './Login.module.css'

interface IFormInputs {
  userName: string
  login: string
  password: string
  confirmPassword: string
  checkbox: boolean
}

export const Registration = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    if (data.password === data.confirmPassword) {
      dispatch(registerTC({
        userName: data.userName,
        login: data.login,
        password: data.password
      }))
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <div>
        <label className={s.label}>Name</label>
        <input className={s.input} {...register('userName', { required: true })} />
      </div>
      <div>
        <label className={s.label}>Login</label>
        <input className={s.input} {...register('login', { required: true })} />
      </div>
      <div>
        <label className={s.label}>Password</label>
        <input className={s.input} type='password' {...register('password', { required: true })} />
      </div>
      <div>
        <label className={s.label}>Enter your password again</label>
        <input className={s.input} type='password' {...register('confirmPassword', { required: true })} />
      </div>
      <div>
        <input type='checkbox' {...register('checkbox', { required: true })} />
        <span>I accept the agreement</span>
      </div>
      <input className={s.input} type="submit" value="Sign Up" />
    </form>
  );
}