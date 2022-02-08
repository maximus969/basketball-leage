import Select from 'react-select';
import styles from './ReactSelect.module.css'

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 5, label: '5' },
]

export const ReactSelect = ({ onChangeOption, pageSize }: ReactSelectPropsType) => {

  const index = options.findIndex(el => el.value === pageSize)

  const onChangeCallback = (e: any) => {
    onChangeOption(e.value)
  }

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
          : undefined,
    }),
    control: () => ({
      width: '70px',
      height: '40px',
      display: 'flex',
      'flex-wrap': 'wrap',
      background: '#ffffff',
      border: '0.5px solid #d1d1d1',
      'border-radius': '4px',
      'box-sizing': 'border-box',
      'align-items': 'center',
      'justify-content': 'space-between',
      'box-shadow': '0.5px solid #d1d1d1'


    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  return (
    <>
      <Select options={options}
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