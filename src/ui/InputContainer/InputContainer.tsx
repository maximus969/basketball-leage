import styles from './InputContainer.module.css'
import { useState, useEffect, FC } from 'react'
import eyeRoundedIcon from '../../assets/icon/eyeRounded.svg'
import closeEyeRoundedIcon from '../../assets/icon/closeEyeRounded.svg'
import { PositionSelect } from '../PositionSelect'


export const InputContainer: FC<InputContainerPropsType> = ({
    register,
    name,
    label,
    errors,
    value,
    type,
    rules,
    control,
    isSelect,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = showPassword ? 'password' : 'text'
    const errorStyle = errors ? `${styles.error}` : ''
    useEffect(() => {
        if (type === 'password') setShowPassword(true)
    }, [])

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            {isSelect ? (
                <PositionSelect
                    name={name}
                    control={control}
                    rules={rules}
                    defaultValue={value}
                />
            ) : (
                <div className={styles.inputStyles}>
                    <input
                        className={`${styles.input} ${errorStyle}`}
                        {...register(name, rules)}
                        defaultValue={value}
                        type={type === 'birthday' ? 'date' : inputType}
                    />
                    {type === 'password' && (
                        <div
                            className={styles.passwordIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img
                                src={
                                    !showPassword
                                        ? eyeRoundedIcon
                                        : closeEyeRoundedIcon
                                }
                                alt="icon"
                            />
                        </div>
                    )}
                </div>
            )}
            {errors && <span className={styles.errorMessage}>{errors}</span>}
        </div>
    )
}

type InputContainerPropsType = {
    label: string
    register?: any
    name: string
    errors: string | undefined
    value?: string | number
    type?: string
    rules?: any
    control?: any
    isSelect?: boolean
}
