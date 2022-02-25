import { FC, useState } from 'react'
import wrapper from './Content.module.css'
import styles from './AddTeam.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppRootStateType } from '../core/redux/store'
import { Button } from '../ui/Button/Button'
import { InputContainer } from '../ui/InputContainer/InputContainer'
import addPhotoImage from '../assets/icon/add_a_photo_24px_rounded.svg'
import { imageConverter } from '../utils/imgConverter'
import { PATH } from './routes'
import { addPlayer } from '../modules/players/playersThunk'

export interface IFormAddPlayerInputs {
    name: string
    position: string
    team: number
    height: number
    weight: number
    birthday: string
    number: number
    imageUrl: string
}

export const AddPlayer: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )
    const [newImageUrl, setNewImageUrl] = useState('')

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<IFormAddPlayerInputs>()

    const onSubmit = (formData: IFormAddPlayerInputs) => {
        const birthday = new Date(
            formData.birthday.split('-').reverse().join('-')
        ).toISOString()
        dispatch(
            addPlayer({
                data: { ...formData, avatarUrl: newImageUrl, birthday },
                navigate
            })
        )
    }

    const cancelHandler = () => {
        navigate(PATH.PLAYERS)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files) {
            imageConverter(e.currentTarget.files[0], setNewImageUrl)
        }
    }

    return (
        <div className={wrapper.mainContent}>
            <div className={`${styles.container} ${styles.playerContainer}`}>
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
                            name={'position'}
                            control={control}
                            label={'Position'}
                            errors={errors.position?.message}
                            rules={{ required: 'Position is required' }}
                            isSelect={true}
                        />
                        <InputContainer
                            name={'team'}
                            control={control}
                            label={'Team'}
                            errors={errors.team?.message}
                            rules={{ required: 'Team is required' }}
                            isSelect={true}
                        />
                        <div className={styles.twoItemsContainer}>
                            <div className={styles.oneItemContainer}>
                                <InputContainer
                                    name={'height'}
                                    register={register}
                                    label={'Height (cm)'}
                                    errors={errors.height?.message}
                                    rules={{ required: 'Height is required' }}
                                />
                            </div>
                            <div className={styles.oneItemContainer}>
                                <InputContainer
                                    name={'weight'}
                                    register={register}
                                    label={'Weight (kg)'}
                                    errors={errors.weight?.message}
                                    rules={{ required: 'Weight is required' }}
                                />
                            </div>
                        </div>
                        <div className={styles.twoItemsContainer}>
                            <div className={styles.oneItemContainer}>
                                <InputContainer
                                    name={'birthday'}
                                    register={register}
                                    label={'Birthday'}
                                    errors={errors.birthday?.message}
                                    rules={{ required: 'Birthday is required' }}
                                    type="birthday"
                                />
                            </div>
                            <div className={styles.oneItemContainer}>
                                <InputContainer
                                    name={'number'}
                                    register={register}
                                    label={'Number'}
                                    errors={errors.number?.message}
                                    rules={{ required: 'Number is required' }}
                                />
                            </div>
                        </div>

                        <div className={styles.buttonsContainer}>
                            <Button
                                name={'Cancel'}
                                onClickHandler={cancelHandler}
                                width={'171px'}
                                disabled={isLoading}
                            />
                            <Button
                                name={'Save'}
                                width={'171px'}
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
