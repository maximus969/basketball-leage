import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import wrapper from '../../Content.module.css'
import styles from './AddTeam.module.css'
import { addTeamTC } from '../../../../../modules/teams/teamsThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes';
import { newData } from './../../../../../utils/imgConverter';
import { InputContainer } from '../../../../../ui/InputContainer/InputContainer';


interface IFormInputs {
  name: string
  division: string
  conference: string
  foundationYear: number
  imageUrl: string
}

export const AddTeam: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    division: Yup.string()
      .required('Division is required'),
    conference: Yup.string()
      .required('Conference is required'),
    foundationYear: Yup.string()
      .required('Year Of Foundation is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>(formOptions);

  const onSubmit = (data: IFormInputs) => {
    newData(data.imageUrl[0], data, dispatch, addTeamTC)
  };

  const cancelHandler = () => {
    navigate(PATH.TEAMS)
  }

  return (
    <div className={wrapper.mainContent}>
      <div className={styles.container}>
        <div className={styles.heading}></div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputFormContainer}>
            <InputContainer name={'name'} register={register} label={'Name'} errors={errors} />
            <InputContainer name={'division'} register={register} label={'Division'} errors={errors} />
            <InputContainer name={'conference'} register={register} label={'Conference'} errors={errors} />
            <InputContainer name={'foundationYear'} register={register} label={'Year Of Foundation'} errors={errors} />
            <div className={styles.buttonsContainer}>
              <input className={styles.cancelButton} onClick={cancelHandler} type="button" value="Cancel" />
              <input className={styles.saveButton} type="submit" value="Save" />
            </div>
          </div>

          <div>
            <label>imgUrl</label>
            <input type='file' {...register('imageUrl')} />
          </div>

        </form>
      </div>
    </div>
  )
}