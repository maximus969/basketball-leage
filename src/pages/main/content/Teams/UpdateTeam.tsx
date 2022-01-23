import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import wrapper from '../Content.module.css'
import { updateTeamTC } from '../../../../modules/teams/teamsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from '../../../../core/redux/store';

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
    dispatch(updateTeamTC({ ...data, id }))
    navigate(-1)
  };

  const cancelHandler = () => {
    navigate(-1)
  }

  return (
    <div className={wrapper.mainContent}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label>Name</label>
            <input defaultValue={name} {...register('name')} />
            {errors?.name && <span>{errors.name.message}</span>}
          </div>

          <div>
            <label>Division</label>
            <input defaultValue={division} {...register('division')} />
            {errors?.division && <span>{errors.division.message}</span>}
          </div>

          <div>
            <label>Conference</label>
            <input defaultValue={conference} {...register('conference')} />
            {errors?.conference && <span>{errors.conference.message}</span>}
          </div>

          <div>
            <label>Year Of Foundation</label>
            <input defaultValue={foundationYear} {...register('foundationYear')} />
            {errors?.foundationYear && <span>{errors.foundationYear.message}</span>}
          </div>

          <div>
            <label>imgUrl</label>
            <input {...register('imageUrl')} />
          </div>

          <input type="submit" value="Save" />
          <input onClick={cancelHandler} type="button" value="Cancel" />

        </form>
      </div>
    </div>
  )
}