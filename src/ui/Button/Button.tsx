import { FC } from 'react'
import styles from './Button.module.css'

export const Button: FC<ButtonPropsType> = ({
    name,
    onClickHandler,
    disabled,
    width,
    type
}) => {
    const buttonType = type === 'submit' ? 'submit' : 'button'
    const buttonFormName =
        name === 'Cancel' ? styles.cancelButton : styles.button
    const buttonWidthType = width === '171px' ? styles.formButton : ''

    return (
        <button
            onClick={onClickHandler}
            type={buttonType}
            disabled={disabled}
            className={`${buttonFormName} ${buttonWidthType}`}
        >
            {name}
        </button>
    )
}

type ButtonPropsType = {
    name: string
    onClickHandler?: () => void
    width?: string
    disabled?: boolean
    type?: string
}
