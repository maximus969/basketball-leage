import { ChangeEvent, useEffect, KeyboardEvent } from 'react'
import { useDispatch } from 'react-redux'
import wrapper from '../../Content.module.css'
import styles from './GetTeams.module.css'
import { getTeamsTC } from '../../../../../modules/teams/teamsThunk'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../../../core/redux/store'
import { TeamDto } from '../../../../../api/dto/ITeam'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../routes'
import { useState } from 'react'
import searchIcon from '../../../../../assets/icon/search_rounded.svg'
import { BoxPreview } from '../../../../../ui/BoxPreview/BoxPreview'
import { ReactSelect } from '../../../../../ui/ReactSelect/ReactSelect'
import { ItemsNotFound } from '../../../../../ui/ItemsNotFound/ItemsNotFound'
import { Paginator } from '../../../../../ui/Paginator/Paginator'
import { Button } from '../../../../../ui/Button/Button'

export const Teams: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const totalElementCount = useSelector<AppRootStateType, number>(
        (state) => state.teams.count
    )
    const pageSize = useSelector<AppRootStateType, number>(
        (state) => state.teams.size
    )
    const teams = useSelector<AppRootStateType, TeamDto[]>(
        (state) => state.teams.data
    )
    const [searchTeam, setSearchTeam] = useState<string>('')
    const [paginatorSearch, setPaginatorSearch] = useState<string>('')

    useEffect(() => {
        if (!searchTeam) {
            setPaginatorSearch('')
            dispatch(getTeamsTC(searchTeam, 1, pageSize))
        }
    }, [searchTeam])

    const addTeamHandler = () => {
        navigate(PATH.ADD_TEAMS)
    }
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTeam(e.currentTarget.value)
    }
    const startSearchingTeam = () => {
        setPaginatorSearch(searchTeam)
        dispatch(getTeamsTC(searchTeam, 1, pageSize))
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setPaginatorSearch(searchTeam)
            dispatch(getTeamsTC(searchTeam, 1, pageSize))
        }
    }

    // Paginator + Selector
    const handlePageClick = (event: { selected: number }) => {
        const newCurrentPage = event.selected + 1
        dispatch(getTeamsTC(paginatorSearch, newCurrentPage, pageSize))
    }

    const onChangeOption = (value: number) => {
        dispatch(getTeamsTC(searchTeam, 1, value))
    }

    const Items = ({ currentItems }: { currentItems: TeamDto[] }) => {
        return (
            <>
                {currentItems &&
                    currentItems.map((item: TeamDto) => {
                        const showTeamInfo = () => {
                            navigate(`${item.id}`)
                        }
                        return (
                            <BoxPreview
                                onClick={showTeamInfo}
                                foundationYear={item.foundationYear}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                key={item.id}
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
                    <div className={styles.searchBlock}>
                        <div className={styles.inputStyles}>
                            <input
                                className={styles.input}
                                onChange={onSearchChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search..."
                            />
                            <div
                                className={styles.searchIcon}
                                onClick={startSearchingTeam}
                            >
                                <img src={searchIcon} alt="icon" />
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                name={'Add +'}
                                onClickHandler={addTeamHandler}
                            />
                        </div>
                    </div>

                    {teams.length === 0 ? (
                        <ItemsNotFound />
                    ) : (
                        <div className={styles.items}>
                            <Items currentItems={teams} />
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
