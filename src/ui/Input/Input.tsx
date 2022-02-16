import { FC } from 'react'
import styles from './Input.module.css'

export const Input: FC<InputPropsType> = ({
    register,
    name,
    value,
    isPasswordType,
    rules,
    ...rest
}) => {
    const inputType = isPasswordType ? 'password' : 'text'

    return (
        <input
            className={styles.input}
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
}
