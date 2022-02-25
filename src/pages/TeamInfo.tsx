import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import wrapper from './Content.module.css'
import styles from './TeamInfo.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTeam, getTeamInfo } from '../modules/teams/teamsThunk'
import { AppRootStateType } from '../core/redux/store'
import { ReactComponent as DeleteIcon } from '../assets/icon/delete_rounded.svg'
import { ReactComponent as UpdateIcon } from '../assets/icon/create_rounded.svg'
// import { getPlayersTC } from '../modules/players/playersThunk'
import { PlayerDto } from '../api/dto/IPlayer'
import { countAge } from '../utils/countAge'
import { fetchPlayers } from '../modules/players/playersThunk'

export const TeamInfo: FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    const teamsPlayers = useSelector<AppRootStateType, PlayerDto[]>(
        (state) => state.players.players.data
    )

    useEffect(() => {
        dispatch(getTeamInfo(Number(id)))
        dispatch(
            fetchPlayers({
                name: '',
                id: [Number(id)],
                page: 0,
                pageSize: 0
            })
        )
    }, [])

    const deleteTeamHandler = () => {
        dispatch(deleteTeam(Number(id)))
        navigate(-1)
    }
    const updateTeam = () => {
        navigate(`/teams/${id}/update-team`)
    }

    return (
        <div className={wrapper.mainContent}>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <div className={styles.iconsContainer}>
                            <div
                                onClick={updateTeam}
                                className={styles.iconsStyles}
                            >
                                <UpdateIcon className={styles.headerIcon} />
                            </div>
                            <div
                                onClick={deleteTeamHandler}
                                className={styles.iconsStyles}
                            >
                                <DeleteIcon
                                    className={`${styles.headerIcon} ${styles.deleteIcon}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.teamInfoContainer}>
                        <div className={styles.imgBlock}>
                            <img className={styles.img} src={imageUrl} />
                        </div>

                        <div className={styles.textInfoBlock}>
                            <div className={styles.textInfo}>
                                <div>
                                    <h2 className={styles.title}>{name}</h2>
                                </div>

                                <div className={styles.description}>
                                    <div className={styles.descriptionBlock}>
                                        <label className={styles.label}>
                                            Year of foundation
                                        </label>
                                        <p className={styles.text}>
                                            {foundationYear}
                                        </p>
                                    </div>
                                    <div className={styles.descriptionBlock}>
                                        <label className={styles.label}>
                                            Division
                                        </label>
                                        <p className={styles.text}>
                                            {division}
                                        </p>
                                    </div>
                                    <div className={styles.descriptionBlock}>
                                        <label className={styles.label}>
                                            Conference
                                        </label>
                                        <p className={styles.text}>
                                            {conference}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.header}>
                            <tr className={styles.th1}>
                                <th className={styles.headerName} colSpan={5}>
                                    Roster
                                </th>
                            </tr>
                            <tr className={styles.headerAtributes}>
                                <th className={styles.th1}>#</th>
                                <th className={styles.th1}>Player</th>
                                <th className={styles.th1}>Height</th>
                                <th className={styles.th1}>Weight</th>
                                <th className={styles.th1}>Age</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {teamsPlayers.map((player) => {
                                return (
                                    <tr
                                        key={player.id}
                                        className={styles.bodyAtributes}
                                    >
                                        <td className={styles.bodyCell}>
                                            {' '}
                                            {player.number}
                                        </td>
                                        <td className={styles.bodyCell}>
                                            <div
                                                className={
                                                    styles.playerInfoBlock
                                                }
                                            >
                                                <img
                                                    src={player.avatarUrl}
                                                    className={styles.playerImg}
                                                    alt=""
                                                />
                                                <div
                                                    className={
                                                        styles.playerInfo
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.playerInfoName
                                                        }
                                                    >
                                                        {player.name}
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.playerInfoPosition
                                                        }
                                                    >
                                                        {player.position}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.bodyCell}>
                                            {' '}
                                            {player.height} cm
                                        </td>
                                        <td className={styles.bodyCell}>
                                            {' '}
                                            {player.weight} kg
                                        </td>
                                        <td className={styles.bodyCell}>
                                            {' '}
                                            {countAge(player.birthday)}{' '}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
