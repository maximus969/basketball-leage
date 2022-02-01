import styles from './InputContainer.module.css'
import { Input } from '../Input/Input';

export const InputContainer = ({ register, name, label, errors, value, ...rest }: InputContainerPropsType) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <Input name={name} register={register} value={value} />
      {errors?.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
    </div>
  )
}

type InputContainerPropsType = {
  label: string
  register: any
  name: string
  errors: any
  value? : string | number
}