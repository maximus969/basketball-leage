import Select, { SingleValue, StylesConfig } from 'react-select'
import styles from './ReactSelect.module.css'
import { FC, useState } from 'react'

type MyOptionType = {
    label: string
    value: number
}

const options: MyOptionType[] = [
    { value: 6, label: '6' },
    { value: 12, label: '12' },
    { value: 24, label: '24' }
]

type IsMulti = false

export const ReactSelect: FC<ReactSelectPropsType> = ({
    onChangeOption,
    pageSize
}) => {
    let index = options.findIndex((el) => el.value === pageSize)
    typeof index === 'number' ? index : index = 0
    const [deviceHeight, setDeviceHeight] = useState('')

    const onChangeCallback = (e: SingleValue<MyOptionType>) => {
        if (e?.value && e.value !== pageSize) {
            onChangeOption(e.value)
        }
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && deviceHeight !== '40px')
            setDeviceHeight('40px')
        else if (window.innerWidth <= 768 && deviceHeight !== '28px')
            setDeviceHeight('28px')
    })

    const customStyles: StylesConfig<MyOptionType, IsMulti> = {
        option: (provided, state) => ({
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
        control: (provided, state) => ({
            ...provided,
            width: '77px',
            height: '40px',
            display: 'flex',
            background: '#ffffff',
            border: '0.5px solid #d1d1d1',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: 'none',
            '&:hover': {
                border: '0.5px solid #d1d1d1'
            },
            '@media screen and (max-width: 480px)': {
                ...provided,
                height: '28px',
                border: '0.5px solid #d1d1d1',
                boxShadow: 'none',
                '&:hover': {
                    border: '0.5px solid #d1d1d1'
                },
            }
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1
            const transition = 'opacity 300ms'

            return { ...provided, opacity, transition }
        }
    }

    return (
        <Select
            options={options}
            defaultValue={options[index]}
            onChange={onChangeCallback}
            menuPlacement="top"
            styles={customStyles}
        />
    )
}

type ReactSelectPropsType = {
    onChangeOption: (option: number) => void
    pageSize: number
}
