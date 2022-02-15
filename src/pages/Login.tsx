import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../core/redux/store'
import { authTC } from '../modules/auth/authorizationThunk'
import styles from './Auth.module.css'
import { ReactComponent as IconFont } from '../assets/icon/Group.svg'
import { Navigate, NavLink } from 'react-router-dom'
import { PATH } from './routes'
import { Button } from '../ui/Button/Button'
import { InputContainer } from '../ui/InputContainer/InputContainer'

export interface ILoginFormInputs {
    login: string
    password: string
}

export const Login: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    )
    const isLoading = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )

    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Login is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    })
    const formOptions = { resolver: yupResolver(validationSchema) }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginFormInputs>(formOptions)

    const onSubmit = (data: ILoginFormInputs) => {
        dispatch(
            authTC({
                login: data.login,
                password: data.password
            })
        )
    }

    if (isLoggedIn) {
        return <Navigate replace to={PATH.TEAMS} />
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.authContainer}>
                <div className={styles.authBlock}>
                    <h2 className={styles.title}>Sign In</h2>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputContainer
                            name={'login'}
                            register={register}
                            label={'Login'}
                            errors={errors.login?.message}
                        />
                        <InputContainer
                            name={'password'}
                            register={register}
                            label={'Password'}
                            errors={errors.password?.message}
                            type={'password'}
                        />

                        <div className={styles.buttonContainer}>
                            <Button
                                name={'Sign In'}
                                type={'submit'}
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.authSign}>
                            <span className={styles.spanMember}>
                                Not a member yet?
                            </span>
                            <NavLink
                                to={PATH.REGISTRATION}
                                className={styles.pathLink}
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <IconFont className={styles.imageBlock} />
            </div>
        </div>
    )
}
