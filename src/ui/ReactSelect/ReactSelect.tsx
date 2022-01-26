import Select from 'react-select';
import styles from './ReactSelect.module.css'

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
]

export const ReactSelect = ({ onChangeOption }: ReactSelectPropsType) => {

  const onChangeCallback = (e: any) => {
    onChangeOption(e.value)
  }

  return (
    <>
      <Select options={options}
        defaultValue={options[0]}
        onChange={onChangeCallback}
        className={styles.container}
      />
    </>
  )
}

type ReactSelectPropsType = {
  onChangeOption: (option: number) => void
}