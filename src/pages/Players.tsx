import wrapper from './Content.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './GetTeams.module.css'
import searchIcon from '../assets/icon/search_rounded.svg'
import { useNavigate } from 'react-router-dom'
import { AppRootStateType } from '../core/redux/store'
import { PlayerDto } from '../api/dto/IPlayer'
import { PATH } from './routes'
import { BoxPreview } from '../ui/BoxPreview/BoxPreview'
import { Button } from '../ui/Button/Button'
import { ItemsNotFound } from '../ui/ItemsNotFound/ItemsNotFound'
import { Paginator } from '../ui/Paginator/Paginator'
import { ReactSelect } from '../ui/ReactSelect/ReactSelect'
import { MultiSelect } from '../ui/MultiSelect'
import { fetchPlayers } from '../modules/players/playersThunk'

export const Players: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [multiSearch, setMultiSearch] = useState<number[]>([])
    const totalElementCount = useSelector<AppRootStateType, number>(
        (state) => state.players.players.count
    )
    const pageSize = useSelector<AppRootStateType, number>(
        (state) => state.players.players.size
    )
    const players = useSelector<AppRootStateType, PlayerDto[]>(
        (state) => state.players.players.data
    )
    const [searchPlayers, setSearchPlayers] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchPlayers({
                name: searchPlayers,
                id: multiSearch,
                page: 1,
                pageSize
            })
        )
    }, [searchPlayers])

    const addPlayerHandler = () => {
        navigate(PATH.ADD_PLAYER)
    }
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchPlayers(e.currentTarget.value)
    }
    const startSearchingTeam = () => {
        dispatch(
            fetchPlayers({
                name: searchPlayers,
                id: multiSearch,
                page: 1,
                pageSize
            })
        )
    }

    // Paginator + Selector
    const handlePageClick = (event: { selected: number }) => {
        const newCurrentPage = event.selected + 1
        dispatch(
            fetchPlayers({
                name: searchPlayers,
                id: multiSearch,
                page: newCurrentPage,
                pageSize
            })
        )
    }

    const onChangeOption = (value: number) => {
        dispatch(
            fetchPlayers({
                name: searchPlayers,
                id: multiSearch,
                page: 1,
                pageSize: value
            })
        )
    }
    const onChangeMultiOption = (data: number[]) => {
        setMultiSearch(data)
        dispatch(
            fetchPlayers({
                name: searchPlayers,
                id: data,
                page: 1,
                pageSize
            })
        )
    }

    const Items = ({ currentItems }: { currentItems: PlayerDto[] }) => {
        return (
            <>
                {currentItems &&
                    currentItems.map((item: PlayerDto) => {
                        const showInfo = () => {
                            navigate(`${item.id}`)
                        }
                        return (
                            <BoxPreview
                                onClick={showInfo}
                                date={item.number}
                                name={item.name}
                                imageUrl={item.avatarUrl}
                                key={item.id}
                                item="player"
                            />
                        )
                    })}
            </>
        )
    }

    return (
        <div className={wrapper.mainContent}>
            <div className={styles.mainBlock}>
                <div className={styles.block}>
                    <div
                        className={`${styles.searchBlock} ${styles.searchPlayerBlock}`}
                    >
                        <div className={styles.searchStyles}>
                            <div className={styles.inputStyles}>
                                <input
                                    className={styles.input}
                                    onChange={onSearchChange}
                                    placeholder="Search..."
                                />
                                <div
                                    className={styles.searchIcon}
                                    onClick={startSearchingTeam}
                                >
                                    <img src={searchIcon} alt="icon" />
                                </div>
                            </div>
                            <MultiSelect
                                onChangeMultiOption={onChangeMultiOption}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                name={'Add +'}
                                onClickHandler={addPlayerHandler}
                            />
                        </div>
                    </div>

                    {players.length === 0 ? (
                        <ItemsNotFound item={'players'} />
                    ) : (
                        <div className={styles.items}>
                            <Items currentItems={players} />
                        </div>
                    )}

                    <div className={styles.paginateBlock}>
                        <Paginator
                            pageSize={pageSize}
                            totalElementCount={totalElementCount}
                            handlePageClick={handlePageClick}
                        />
                        <ReactSelect
                            onChangeOption={onChangeOption}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
