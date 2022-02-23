import { FC, useState } from "react"
import wrapper from './Content.module.css'
import styles from './AddTeam.module.css'
import addPhotoImage from '../assets/icon/add_a_photo_24px_rounded.svg'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppRootStateType } from "../core/redux/store"
import { Button } from "../ui/Button/Button"
import { InputContainer } from "../ui/InputContainer/InputContainer"
import { imageConverter } from "../utils/imgConverter"
import { ageToFormat } from "../utils/countAge"
import { updatePlayerTC } from "../modules/players/playersThunk"

export interface IFormInputs {
  name: string
  position: string
  team: number
  height: number
  weight: number
  birthday: string
  number: number
  imageUrl: string
}

export const UpdatePlayer: FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector<AppRootStateType, boolean>(
    (state) => state.app.status
  )
  const id = useSelector<AppRootStateType, number>(
    (state) => state.players.player.id
  )
  const name = useSelector<AppRootStateType, string>(
    (state) => state.players.player.name
  )
  const number = useSelector<AppRootStateType, number>(
    (state) => state.players.player.number
  )
  const position = useSelector<AppRootStateType, string>(
    (state) => state.players.player.position
  )
  const team = useSelector<AppRootStateType, number>(
    (state) => state.players.player.team
  )
  const height = useSelector<AppRootStateType, number>(
    (state) => state.players.player.height
  )
  const weight = useSelector<AppRootStateType, number>(
    (state) => state.players.player.weight
  )
  const age = useSelector<AppRootStateType, string>(
    (state) => state.players.player.birthday
  )
  const imageUrl = useSelector<AppRootStateType, string>(
    (state) => state.players.player.avatarUrl
  )
  const [newImageUrl, setNewImageUrl] = useState(imageUrl)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInputs>()

  const onSubmit = (formData: IFormInputs) => {
    dispatch(
      updatePlayerTC({
        ...formData, id, avatarUrl: newImageUrl
      })
    )
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
      <div className={`${styles.container} ${styles.playerContainer}`}>
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
              name={'name'}
              register={register}
              label={'Name'}
              errors={errors.name?.message}
              rules={{ required: 'Name is required' }}
              value={name}
            />
            <InputContainer
              name={'position'}
              control={control}
              label={'Position'}
              errors={errors.position?.message}
              rules={{ required: 'Position is required' }}
              isSelect={true}
              value={position}
            />
            <InputContainer
              name={'team'}
              control={control}
              label={'Team'}
              errors={errors.team?.message}
              rules={{ required: 'Team is required' }}
              isSelect={true}
              value={team}
            />
            <div className={styles.twoItemsContainer}>
              <div className={styles.oneItemContainer}>
                <InputContainer
                  name={'height'}
                  register={register}
                  label={'Height (cm)'}
                  errors={errors.height?.message}
                  rules={{ required: 'Height is required' }}
                  value={height}
                />
              </div>
              <div className={styles.oneItemContainer}>
                <InputContainer
                  name={'weight'}
                  register={register}
                  label={'Weight (kg)'}
                  errors={errors.weight?.message}
                  rules={{ required: 'Weight is required' }}
                  value={weight}
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
                  type='birthday'
                  value={ageToFormat(age)}
                />
              </div>
              <div className={styles.oneItemContainer}>
                <InputContainer
                  name={'number'}
                  register={register}
                  label={'Number'}
                  errors={errors.number?.message}
                  rules={{ required: 'Number is required' }}
                  value={number}
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