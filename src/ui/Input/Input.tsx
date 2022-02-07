import styles from './Input.module.css'

export const Input = ({ register, name, value, isPasswordType, ...rest }: InputPropsType) => {

  const inputType = isPasswordType ? 'password' : 'text'

  return (
    <>
      <input className={styles.input} {...register(name)} defaultValue={value} type={inputType} />
    </>
  )
}

type InputPropsType = {
  register: any
  name: string
  value?: string | number
  isPasswordType?: boolean | string
}