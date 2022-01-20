import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import styles from './AddTeam.module.css'
import { addTeamTC } from '../../../../modules/teams/teamsThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes';


interface IFormInputs {
  name: string
  division: string
  conference: string
  foundationYear: number
  imageUrl: string
}

export const AddTeam = () => {
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
    dispatch(addTeamTC(data))
  };

  const cancelHandler = () => {
    navigate(PATH.TEAMS)
  }

  return (
    <div className={styles.mainContent}>
      <div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Name</label>
            <input className={styles.input} {...register('name')} />
            {errors?.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Division</label>
            <input className={styles.input} {...register('division')} />
            {errors?.division && <span className={styles.error}>{errors.division.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Conference</label>
            <input className={styles.input} {...register('conference')} />
            {errors?.conference && <span className={styles.error}>{errors.conference.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Year Of Foundation</label>
            <input className={styles.input} {...register('foundationYear')} />
            {errors?.foundationYear && <span className={styles.error}>{errors.foundationYear.message}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>imgUrl</label>
            <input className={styles.input} {...register('imageUrl')} />
          </div>

          <input className={styles.input} type="submit" value="Save" />
          <input onClick={cancelHandler} className={styles.input} type="button" value="Cancel" />

        </form>
      </div>
    </div>
  )
}