import styles from './Button.module.css'

export const Button = ({ name, onClickHandler, disabled, width, type }: ButtonPropsType) => {

  const buttonType = type === 'submit' ? 'submit' : 'button'

  return (
    <>
      <button style={{ width: width }}
        onClick={onClickHandler}
        type={buttonType}
        disabled={disabled}
        className={name === 'Cancel' ? styles.cancelButton : styles.button}
      >
        {name}
      </button>
    </>
  )
}

type ButtonPropsType = {
  name: string
  onClickHandler?: () => void
  width?: string
  disabled?: boolean
  type?: string
}