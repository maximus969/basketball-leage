import { FC, useEffect } from 'react'
import Select, { MultiValue, StylesConfig } from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTeams } from '../modules/teams/teamsThunk'
import { AppRootStateType } from '../core/redux/store'
import { TeamDto } from '../api/dto/ITeam'

type MyOptionType = {
    label: string
    value: number
}

type IsMulti = true

export const MultiSelect: FC<MultiSelectProps> = ({ onChangeMultiOption }) => {
    const dispatch = useDispatch()
    const teamsData = useSelector<AppRootStateType, TeamDto[]>(
        (state) => state.teams.teams.data
    )
    useEffect(() => {
        dispatch(fetchTeams({ searchTeam: '', page: 0, pageSize: 0 }))
    }, [])

    const teamsArray = teamsData.map((el) => {
        return { value: el.id, label: el.name }
    })

    const onChangeHandler = (data: MultiValue<MyOptionType>) => {
        const idArray = data.map((el) => el.value)
        onChangeMultiOption(idArray)
    }

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
        placeholder: (provided, state) => ({
            ...provided,
            color: '#707070',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '24px',
            marginLeft: '10px'
        }),
        control: (provided, state) => ({
            ...provided,
            width: '366px',
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
            '@media screen and (max-width: 768px)': {
                ...provided,
                width: '100%',
                height: '28px',
                border: '0.5px solid #d1d1d1',
                background: '#ffffff',
                boxShadow: 'none',
                '&:hover': {
                    border: '0.5px solid #d1d1d1'
                }
            }
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1
            const transition = 'opacity 300ms'

            return { ...provided, opacity, transition }
        },
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: '#ffffff'
        }),
        multiValue: (provided, state) => ({
            ...provided,
            background: '#E4163A',
            borderRadius: '4px',
            color: '#ffffff'
        })
    }

    return (
        <Select
            placeholder={'Search...'}
            closeMenuOnSelect={false}
            options={teamsArray}
            onChange={onChangeHandler}
            styles={customStyles}
            isMulti={true}
        />
    )
}

type MultiSelectProps = {
    onChangeMultiOption: (data: number[]) => void
}
