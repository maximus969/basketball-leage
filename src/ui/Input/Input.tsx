import styles from './Input.module.css'

export const Input = ({ register, name, value, ...rest }: InputPropsType) => {
  return (
    <>
      <input className={styles.input} {...register(name)} defaultValue={value} />
    </>
  )
}

type InputPropsType = {
  register: any
  name: string
  value?: string | number
}