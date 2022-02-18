import { useForm } from 'react-hook-form'
import wrapper from './Content.module.css'
import styles from './AddTeam.module.css'
import { updateTeam } from '../modules/teams/teamsThunk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppRootStateType } from '../core/redux/store'
import { InputContainer } from '../ui/InputContainer/InputContainer'
import { imageConverter } from '../utils/imgConverter'
import { Button } from '../ui/Button/Button'
import addPhotoImage from '../assets/icon/add_a_photo_24px_rounded.svg'
import { FC, useState } from 'react'

interface IFormInputs {
    name: string
    division: string
    conference: string
    foundationYear: number
    imageUrl: string
}

export const UpdateTeam: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )
    const id = useSelector<AppRootStateType, number>(
        (state) => state.teams.team.id
    )
    const name = useSelector<AppRootStateType, string>(
        (state) => state.teams.team.name
    )
    const conference = useSelector<AppRootStateType, string>(
        (state) => state.teams.team.conference
    )
    const division = useSelector<AppRootStateType, string>(
        (state) => state.teams.team.division
    )
    const foundationYear = useSelector<AppRootStateType, number>(
        (state) => state.teams.team.foundationYear
    )
    const imageUrl = useSelector<AppRootStateType, string>(
        (state) => state.teams.team.imageUrl
    )
    const [newImageUrl, setNewImageUrl] = useState(imageUrl)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInputs>()

    const onSubmit = (formData: IFormInputs) => {
        dispatch(updateTeam({
            data: { ...formData, id, imageUrl: newImageUrl },
            navigate
        }))
    }

    const cancelHandler = () => {
        navigate(-1)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files) {
            imageConverter(e.currentTarget.files[0], setNewImageUrl)
        }
    }

    return (
        <div className={wrapper.mainContent}>
            <div className={styles.container}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.formContainer}
                >
                    <div
                        className={styles.addFileBlock}
                        style={{
                            backgroundImage: `url(${addPhotoImage}),
                            url(${newImageUrl})`
                        }}
                    >
                        <input
                            type="file"
                            {...register('imageUrl')}
                            className={styles.addFileInput}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className={styles.inputFormContainer}>
                        <InputContainer
                            value={name}
                            name={'name'}
                            register={register}
                            label={'Name'}
                            errors={errors.name?.message}
                            rules={{ required: 'Name is required' }}
                        />
                        <InputContainer
                            value={division}
                            name={'division'}
                            register={register}
                            label={'Division'}
                            errors={errors.division?.message}
                            rules={{ required: 'Division is required' }}
                        />
                        <InputContainer
                            value={conference}
                            name={'conference'}
                            register={register}
                            label={'Conference'}
                            errors={errors.conference?.message}
                            rules={{ required: 'Conference is required' }}
                        />
                        <InputContainer
                            value={foundationYear}
                            name={'foundationYear'}
                            register={register}
                            label={'Year Of Foundation'}
                            errors={errors.foundationYear?.message}
                            rules={{
                                required: 'Year Of Foundation is required'
                            }}
                        />
                        <div className={styles.buttonsContainer}>
                            <Button
                                name={'Cancel'}
                                width={'45%'}
                                onClickHandler={cancelHandler}
                                disabled={isLoading}
                            />
                            <Button
                                name={'Save'}
                                width={'45%'}
                                type={'submit'}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
