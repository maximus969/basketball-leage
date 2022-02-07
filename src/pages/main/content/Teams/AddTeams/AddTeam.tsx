import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import wrapper from '../../Content.module.css'
import styles from './AddTeam.module.css'
import { addTeamTC } from '../../../../../modules/teams/teamsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes';
import { newData } from './../../../../../utils/imgConverter';
import { InputContainer } from '../../../../../ui/InputContainer/InputContainer';
import { Button } from '../../../../../ui/Button/Button';
import { AppRootStateType } from '../../../../../core/redux/store';


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
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.status)

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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>

          <div className={styles.addFileBlock}>
            <input type='file' {...register('imageUrl')} className={styles.addFileInput} />
          </div>


          <div className={styles.inputFormContainer}>
            <InputContainer name={'name'} register={register} label={'Name'} errors={errors.name?.message} />
            <InputContainer name={'division'} register={register} label={'Division'} errors={errors.division?.message} />
            <InputContainer name={'conference'} register={register} label={'Conference'} errors={errors.conference?.message} />
            <InputContainer name={'foundationYear'} register={register} label={'Year Of Foundation'} errors={errors.foundationYear?.message} />
            <div className={styles.buttonsContainer}>
              <Button name={'Cancel'} onClickHandler={cancelHandler} width={'45%'} disabled={isLoading} />
              <Button name={'Save'} width={'45%'} type={'submit'} disabled={isLoading} />
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}