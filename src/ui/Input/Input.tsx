import styles from './Input.module.css'

export const Input = ({ register, name, ...rest }: InputPropsType) => {
  return (
    <>
      <input className={styles.input} {...register(name)} />
    </>
  )
}

type InputPropsType = {
  register: any
  name: string
}