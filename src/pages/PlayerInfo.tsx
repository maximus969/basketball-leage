import { FC, useEffect } from 'react'
import wrapper from './Content.module.css'
import styles from './TeamInfo.module.css'
import { ReactComponent as DeleteIcon } from '../assets/icon/delete_rounded.svg'
import { ReactComponent as UpdateIcon } from '../assets/icon/create_rounded.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRootStateType } from '../core/redux/store'
import { deletePlayer, getPlayerInfo } from '../modules/players/playersThunk'
import { countAge } from '../utils/countAge'

export const PlayerInfo: FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector<AppRootStateType, string>(
        (state) => state.players.player.name
    )
    const number = useSelector<AppRootStateType, number>(
        (state) => state.players.player.number
    )
    const position = useSelector<AppRootStateType, string>(
        (state) => state.players.player.position
    )
    const team = useSelector<AppRootStateType, string>(
        (state) => state.players.player.teamName
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

    useEffect(() => {
        dispatch(getPlayerInfo(Number(id)))
    }, [])

    const deletePlayerHandler = () => {
        dispatch(
            deletePlayer({
                id: Number(id),
                navigate
            })
        )
    }
    const updatePlayer = () => {
        navigate(`/players/${id}/update-player`)
    }

    return (
        <div className={wrapper.mainContent}>
            <div className={styles.mainContainer}>
                <div
                    className={`${styles.container} ${styles.playerContainer}`}
                >
                    <div className={styles.heading}>
                        <div className={styles.iconsContainer}>
                            <div
                                onClick={updatePlayer}
                                className={styles.iconsStyles}
                            >
                                <UpdateIcon className={styles.headerIcon} />
                            </div>
                            <div
                                onClick={deletePlayerHandler}
                                className={styles.iconsStyles}
                            >
                                <DeleteIcon
                                    className={`${styles.headerIcon} ${styles.deleteIcon}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.teamInfoContainer} ${styles.playerInfoContainer}`}
                    >
                        <div className={styles.imgPlayerBlock}>
                            <img className={styles.imgPlayer} src={imageUrl} />
                        </div>

                        <div className={styles.textInfoBlock}>
                            <div className={styles.textInfo}>
                                <div>
                                    <h2 className={styles.title}>
                                        {name}
                                        <span
                                            className={styles.numberStyles}
                                        >{` #${number}`}</span>
                                    </h2>
                                </div>

                                <div className={styles.description}>
                                    <div
                                        className={
                                            styles.descriptionPlayerBlock
                                        }
                                    >
                                        <label className={styles.label}>
                                            Position
                                        </label>
                                        <p className={styles.text}>
                                            {position}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.descriptionPlayerBlock
                                        }
                                    >
                                        <label className={styles.label}>
                                            Team
                                        </label>
                                        <p className={styles.text}>{team}</p>
                                    </div>
                                    <div
                                        className={
                                            styles.descriptionPlayerBlock
                                        }
                                    >
                                        <label className={styles.label}>
                                            Height
                                        </label>
                                        <p className={styles.text}>{height}</p>
                                    </div>
                                    <div
                                        className={
                                            styles.descriptionPlayerBlock
                                        }
                                    >
                                        <label className={styles.label}>
                                            Weight
                                        </label>
                                        <p className={styles.text}>{weight}</p>
                                    </div>
                                    <div
                                        className={
                                            styles.descriptionPlayerBlock
                                        }
                                    >
                                        <label className={styles.label}>
                                            Age
                                        </label>
                                        <p className={styles.text}>
                                            {countAge(age)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
