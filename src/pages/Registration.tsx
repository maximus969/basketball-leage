import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../core/redux/store'
import { registerTC } from '../modules/auth/authorizationThunk'
import styles from './Auth.module.css'
import { Navigate, NavLink } from 'react-router-dom'
import { PATH } from './routes'
import { ReactComponent as IconFont } from '../assets/icon/Group1.svg'
import { InputContainer } from '../ui/InputContainer/InputContainer'
import { Button } from '../ui/Button/Button'

interface IFormInputs {
    userName: string
    login: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

export const Registration: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    )
    const isLoading = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<IFormInputs>({ mode: 'onSubmit' })
    const onSubmit = (data: IFormInputs) => {
        dispatch(
            registerTC({
                userName: data.userName,
                login: data.login,
                password: data.password
            })
        )
    }
    console.log(errors)
    if (isLoggedIn) {
        return <Navigate replace to={PATH.TEAMS} />
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.authContainer}>
                <div className={styles.registerBlock}>
                    <h2 className={styles.title}>Sign Up</h2>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputContainer
                            name={'userName'}
                            register={register}
                            label={'Name'}
                            errors={errors.userName?.message}
                            rules={{ required: 'Name is required' }}
                        />
                        <InputContainer
                            name={'login'}
                            register={register}
                            label={'Login'}
                            errors={errors.login?.message}
                            rules={{ required: 'Login is required' }}
                        />
                        <InputContainer
                            name={'password'}
                            register={register}
                            label={'Password'}
                            errors={errors.password?.message}
                            type={'password'}
                            rules={{ required: 'Password is required' }}
                        />
                        <InputContainer
                            name={'confirmPassword'}
                            register={register}
                            label={'Enter your password again'}
                            errors={errors.confirmPassword?.message}
                            type={'password'}
                            rules={{
                                required: 'Confirm password is required',
                                validate: (value: string) =>
                                    value === getValues('password') ||
                                    'Passwords should match'
                            }}
                        />

                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="checkbox"
                                {...register('acceptTerms', {
                                    required: 'You must be accept by agreement'
                                })}
                                className={
                                    errors?.acceptTerms
                                        ? styles.checkboxError
                                        : styles.customCheckbox
                                }
                            />
                            <label htmlFor="checkbox">
                                <span
                                    className={`${styles.checkboxText} ${
                                        errors?.acceptTerms
                                            ? styles.spanError
                                            : ''
                                    }`}
                                >
                                    I accept the agreement
                                </span>
                            </label>
                            {errors?.acceptTerms && (
                                <span className={styles.errorMessage}>
                                    {errors.acceptTerms.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.buttonContainer}>
                            <Button
                                name={'Sign Up'}
                                type={'submit'}
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.authSign}>
                            <span className={styles.spanMember}>
                                Already a member?
                            </span>
                            <NavLink
                                to={PATH.LOGIN}
                                className={styles.pathLink}
                            >
                                Sign In
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
