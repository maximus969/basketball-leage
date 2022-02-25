import styles from './ItemsNotFound.module.css'
import { ReactComponent as NoTeamsIcon } from '../../assets/icon/illustration.svg'
import { ReactComponent as NoPlayersIcon } from '../../assets/icon/illustration1.svg'
import { FC } from 'react'

export const ItemsNotFound: FC<ItemsNotFoundProps> = ({ item }) => {
    return (
        <div className={styles.itemsBlock}>
            <div className={styles.itemsContainer}>
                {item === 'teams' ? (
                    <NoTeamsIcon className={styles.img} />
                ) : (
                    <NoPlayersIcon className={styles.img} />
                )}
                <div className={styles.textBlock}>
                    <h2 className={styles.firstText}>Empty here</h2>
                    <h3 className={styles.secondText}>
                        Add new Teams to continue
                    </h3>
                </div>
            </div>
        </div>
    )
}

type ItemsNotFoundProps = {
    item: 'players' | 'teams'
}
