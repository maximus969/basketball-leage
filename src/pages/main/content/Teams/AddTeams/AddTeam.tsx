import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import wrapper from '../../Content.module.css'
import { addTeamTC } from '../../../../../modules/teams/teamsThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes';
import { NewTeamDto } from './../../../../../api/teams';
import { getBase64, newData } from './../../../../../utils/imgConverter';


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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label>Name</label>
            <input {...register('name')} />
            {errors?.name && <span>{errors.name.message}</span>}
          </div>

          <div>
            <label>Division</label>
            <input {...register('division')} />
            {errors?.division && <span>{errors.division.message}</span>}
          </div>

          <div>
            <label>Conference</label>
            <input {...register('conference')} />
            {errors?.conference && <span>{errors.conference.message}</span>}
          </div>

          <div>
            <label>Year Of Foundation</label>
            <input {...register('foundationYear')} />
            {errors?.foundationYear && <span>{errors.foundationYear.message}</span>}
          </div>

          <div>
            <label>imgUrl</label>
            <input type='file' {...register('imageUrl')} />
          </div>

          <input type="submit" value="Save" />
          <input onClick={cancelHandler} type="button" value="Cancel" />

        </form>
      </div>
    </div>
  )
}