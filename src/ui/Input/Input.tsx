import { FC } from 'react'
import styles from './Input.module.css'

export const Input: FC<InputPropsType> = ({
    register,
    name,
    value,
    isPasswordType,
    rules,
    error,
    ...rest
}) => {
    const inputType = isPasswordType ? 'password' : 'text'
    const errorStyle = error ? `${styles.error}` : ''

    return (
        <input
            className={`${styles.input} ${errorStyle}`}
            {...register(name, rules)}
            defaultValue={value}
            type={inputType}
        />
    )
}

type InputPropsType = {
    register: any
    name: string
    value?: string | number
    isPasswordType?: boolean | string
    rules?: any
    error: string | undefined
}
