import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import wrapper from '../../Content.module.css'
import styles from './AddTeam.module.css'
import { updateTeamTC } from '../../../../../modules/teams/teamsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from '../../../../../core/redux/store';
import { InputContainer } from '../../../../../ui/InputContainer/InputContainer';
import { newData } from '../../../../../utils/imgConverter';

interface IFormInputs {
  name: string
  division: string
  conference: string
  foundationYear: number
  imageUrl: string
}

export const UpdateTeam: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useSelector<AppRootStateType, number>(state => state.team.id)
  const name = useSelector<AppRootStateType, string>(state => state.team.name)
  const conference = useSelector<AppRootStateType, string>(state => state.team.conference)
  const division = useSelector<AppRootStateType, string>(state => state.team.division)
  const foundationYear = useSelector<AppRootStateType, number>(state => state.team.foundationYear)
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
    newData(data.imageUrl[0], { ...data, id }, dispatch, updateTeamTC)

  };

  const cancelHandler = () => {
    navigate(-1)
  }

  return (
    <div className={wrapper.mainContent}>
      <div className={styles.container}>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>

          <div className={styles.addFileBlock}>
            <input type='file' {...register('imageUrl')} className={styles.addFileInput} />
          </div>


          <div className={styles.inputFormContainer}>
            <InputContainer value={name} name={'name'} register={register} label={'Name'} errors={errors} />
            <InputContainer value={division} name={'division'} register={register} label={'Division'} errors={errors} />
            <InputContainer value={conference} name={'conference'} register={register} label={'Conference'} errors={errors} />
            <InputContainer value={foundationYear} name={'foundationYear'} register={register} label={'Year Of Foundation'} errors={errors} />
            <div className={styles.buttonsContainer}>
              <input className={styles.cancelButton} onClick={cancelHandler} type="button" value="Cancel" />
              <input className={styles.saveButton} type="submit" value="Save" />
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}