import Select from 'react-select'
import styles from './ReactSelect.module.css'
import { useState } from 'react'

const options = [
    { value: 6, label: '6' },
    { value: 12, label: '12' },
    { value: 24, label: '24' }
]

export const ReactSelect = ({
    onChangeOption,
    pageSize
}: ReactSelectPropsType) => {
    const index = options.findIndex((el) => el.value === pageSize)
    const [deviceHeight, setDeviceHeight] = useState('')

    const onChangeCallback = (e: any) => {
        onChangeOption(e.value)
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && deviceHeight !== '40px')
            setDeviceHeight('40px')
        else if (window.innerWidth <= 768 && deviceHeight !== '28px')
            setDeviceHeight('28px')
    })

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isFocused
                ? '#FFFFFF'
                : state.isSelected
                ? '#FFFFFF'
                : '#9C9C9C',
            background: state.isFocused
                ? '#FF768E'
                : state.isSelected
                ? '#C60E2E'
                : undefined
        }),
        control: () => ({
            width: '77px',
            height: deviceHeight,
            display: 'flex',
            background: '#ffffff',
            border: '0.5px solid #d1d1d1',
            borderRadius: '4px',
            cursor: 'pointer'
        }),
        singleValue: (provided: any, state: any) => {
            const opacity = state.isDisabled ? 0.5 : 1
            const transition = 'opacity 300ms'

            return { ...provided, opacity, transition }
        }
    }

    return (
        <>
            <Select
                options={options}
                defaultValue={options[index]}
                onChange={onChangeCallback}
                menuPlacement="top"
                styles={customStyles}
            />
        </>
    )
}

type ReactSelectPropsType = {
    onChangeOption: (option: number) => void
    pageSize: number
}
