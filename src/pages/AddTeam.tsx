import { useForm } from 'react-hook-form'
import wrapper from './Content.module.css'
import styles from './AddTeam.module.css'
import { addTeam } from '../modules/teams/teamsThunk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATH } from './routes'
import { imageConverter } from '../utils/imgConverter'
import { InputContainer } from '../ui/InputContainer/InputContainer'
import { Button } from '../ui/Button/Button'
import { AppRootStateType } from '../core/redux/store'
import addPhotoImage from '../assets/icon/add_a_photo_24px_rounded.svg'
import { FC, useState } from 'react'

export interface IFormInputs {
    name: string
    division: string
    conference: string
    foundationYear: number
    imageUrl: string
}

export const AddTeam: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )
    const [newImageUrl, setNewImageUrl] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInputs>()

    const onSubmit = (formData: IFormInputs) => {
        dispatch(addTeam({
            data: { ...formData, imageUrl: newImageUrl },
            navigate
        }))
    }

    const cancelHandler = () => {
        navigate(PATH.TEAMS)
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
                            backgroundImage: `url(${addPhotoImage}), url(${newImageUrl})`
                        }}
                    >
                        <input
                            type="file"
                            {...register('imageUrl', { required: true })}
                            className={styles.addFileInput}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className={styles.inputFormContainer}>
                        <InputContainer
                            name={'name'}
                            register={register}
                            label={'Name'}
                            errors={errors.name?.message}
                            rules={{ required: 'Name is required' }}
                        />
                        <InputContainer
                            name={'division'}
                            register={register}
                            label={'Division'}
                            errors={errors.division?.message}
                            rules={{ required: 'Division is required' }}
                        />
                        <InputContainer
                            name={'conference'}
                            register={register}
                            label={'Conference'}
                            errors={errors.conference?.message}
                            rules={{ required: 'Conference is required' }}
                        />
                        <InputContainer
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
                                onClickHandler={cancelHandler}
                                width={'45%'}
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
