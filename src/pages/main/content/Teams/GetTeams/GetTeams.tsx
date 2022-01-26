import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import wrapper from '../../Content.module.css'
import styles from './GetTeams.module.css'
import { getTeamsTC } from '../../../../../modules/teams/teamsThunk';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../../../core/redux/store';
import { TeamDto } from '../../../../../api/teams';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes';
import { useState } from 'react';
import searchIcon from '../../../../../assets/icon/search_rounded.svg'
import { BoxPreview } from '../../../../../ui/BoxPreview/BoxPreview';
import ReactPaginate from 'react-paginate';
import { ReactSelect } from '../../../../../ui/ReactSelect/ReactSelect';
import paginatorStyles from '../../../../../ui/Paginator/Paginator.module.css'


export const Teams: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const totalElementCount = useSelector<AppRootStateType, number>(state => state.teams.count)
  const currentPage = useSelector<AppRootStateType, number>(state => state.teams.page)
  const pageSize = useSelector<AppRootStateType, number>(state => state.teams.size)
  const teams = useSelector<AppRootStateType, TeamDto[]>(state => state.teams.data)
  const [searchTeam, setSearchTeam] = useState<string>('')

  useEffect(() => {
    if (!searchTeam) {
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
    dispatch(getTeamsTC(searchTeam, 1, pageSize))
  }

  // Paginator + Selector
  const handlePageClick = (event: any) => {
    const newCurrentPage = event.selected + 1
    dispatch(getTeamsTC(searchTeam, newCurrentPage, pageSize))
  };
  const pageCount = Math.ceil(totalElementCount / pageSize)

  const onChangeOption = (value: number) => {
    dispatch(getTeamsTC(searchTeam, 1, value))
  }

  const Items = ({ currentItems }: any) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item: any) => {
            const showTeamInfo = () => {
              navigate(`${item.id}`)
            }
            return (
              <BoxPreview onClick={showTeamInfo} foundationYear={item.foundationYear}
                name={item.name} imageUrl={item.imageUrl} key={item.id} />
            )
          })}
      </>
    );
  }

  return (
    <div className={wrapper.mainContent}>
      <div className={styles.mainBlock}>
        <div className={styles.searchBlock}>
          <div className={styles.inputStyles}>
            <input className={styles.input} onChange={onSearchChange} />
            <div className={styles.searchIcon} onClick={startSearchingTeam}>
              <img src={searchIcon} alt="icon" />
            </div>
          </div>
          <button onClick={addTeamHandler}>add team</button>
        </div>

        <Items currentItems={teams} />
        <div className={styles.paginateBlock}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={undefined}
            className={paginatorStyles.container}
            activeClassName={paginatorStyles.activePageStyles}
            pageClassName={paginatorStyles.pageStyles}
          />
          <ReactSelect onChangeOption={onChangeOption} />
        </div>
      </div>
    </div>
  )
}