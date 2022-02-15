import styles from './InputContainer.module.css'
import { Input } from '../Input/Input'
import { useState, useEffect, FC } from 'react'
import eyeRoundedIcon from '../../assets/icon/eyeRounded.svg'
import closeEyeRoundedIcon from '../../assets/icon/closeEyeRounded.svg'


export const InputContainer: FC<InputContainerPropsType> = ({
    register,
    name,
    label,
    errors,
    value,
    type,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        if (type === 'password') setShowPassword(true)
    }, [])

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputStyles}>
                <Input
                    name={name}
                    register={register}
                    value={value}
                    isPasswordType={showPassword}
                />
                {type && (
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
            {errors && <span className={styles.errorMessage}>{errors}</span>}
        </div>
    )
}

type InputContainerPropsType = {
    label: string
    register: any
    name: string
    errors: string | undefined
    value?: string | number
    type?: string
}
