import wrapper from './Content.module.css'
import { useDispatch } from 'react-redux'
import {
    addPlayerTC,
    deletePlayerTC,
    getPlayerInfoTC,
    updatePlayerTC
} from '../modules/players/playersThunk'
import { FC } from 'react'

export const Players: FC = () => {
    const dispatch = useDispatch()

    return (
        <div className={wrapper.mainContent}>
            <button onClick={() => dispatch(getPlayerInfoTC(913))}></button>
            <button
                onClick={() =>
                    dispatch(
                        updatePlayerTC({
                            name: 'New Button 4',
                            number: 110,
                            position: '11',
                            team: 1855,
                            birthday: '2022-01-06T11:01:33.077',
                            height: 220,
                            weight: 220,
                            avatarUrl: '',
                            id: 913
                        })
                    )
                }
            >
                update player
            </button>
            {/* <button onClick={() => dispatch(deletePlayerTC(967))}>delete</button> */}
        </div>
    )
}
