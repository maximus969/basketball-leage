import Select from 'react-select';

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
]

export const ReactSelect = ({ itemsPerPage, onChangeOption }: ReactSelectPropsType) => {

  const onChangeCallback = (e: any) => {
    onChangeOption(e.value)
  }

  return (
    <>
      <Select options={options} defaultValue={options[0]} onChange={onChangeCallback} />
    </>
  )
}

type ReactSelectPropsType = {
  itemsPerPage: number
  onChangeOption: (option: number) => void
}