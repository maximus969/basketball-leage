import { FC, useEffect } from "react"
import Select, { StylesConfig } from 'react-select'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { fetchTeams } from "../modules/teams/teamsThunk"
import { AppRootStateType } from "../core/redux/store"
import { TeamDto } from "../api/dto/ITeam"

type PositionType = {
  label: string
  value: string | number
}

const positions: PositionType[] = [
  { value: "CenterForward", label: "CenterForward" },
  { value: "GuardForward", label: "GuardForward" },
  { value: "Forward", label: "Forward" },
  { value: "Center", label: "Center" },
  { value: "Guard", label: "Guard" },
]

type IsMulti = false

export const PositionSelect: FC<PositionPropsType> = ({ name, control, rules, defaultValue }) => {
  const dispatch = useDispatch()
  const teamsData = useSelector<AppRootStateType, TeamDto[]>(
    (state) => state.teams.teams.data
  )
  useEffect(() => {
    if (name === 'team') {
      dispatch(fetchTeams({ searchTeam: '', page: 0, pageSize: 0 }))
    }
  }, [])

  const teamsArray = teamsData.map(el => {
    return { value: el.id, label: el.name }
  })

  const finalOption = name === 'position' ? positions : teamsArray

  const customStyles: StylesConfig<PositionType, IsMulti> = {
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
      width: '366px',
      height: '40px',
      display: 'flex',
      background: '#F6F6F6',
      border: '0.5px solid #d1d1d1',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: 'none',
      '&:hover': {
        border: '0.5px solid #d1d1d1'
      },
      '@media screen and (max-width: 768px)': {
        ...provided,
        width: '327px',
        height: '28px',
        border: '0.5px solid #d1d1d1',
        background: '#F6F6F6',
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
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={finalOption.filter(el => el.value === defaultValue).map(el => el.value)[0]}
      render={({ field: { onChange, value, ref, name } }) => (
        <Select
          ref={ref}
          placeholder={"Search..."}
          options={finalOption}
          defaultValue={finalOption.find(c => c.value === defaultValue)}
          value={finalOption.find(c => c.value === value)}
          onChange={val => onChange(val?.value)}
          styles={customStyles}
        />
      )}
    />
  )
}

type PositionPropsType = {
  name: string
  defaultValue?: string | number | undefined
  control: any
  rules: any
}