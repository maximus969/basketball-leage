import styles from './PageNotFound.module.css'
import { ReactComponent as NotFoundIcon } from '../assets/icon/404notFound.svg'
import { FC } from 'react'

export const PageNotFound: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <NotFoundIcon className={styles.icon} />
                <div className={styles.textBlock}>
                    <h2 className={styles.firstText}>Page not found</h2>
                    <h3 className={styles.secondText}>
                        Sorry, we cant find what you are looking for
                    </h3>
                </div>
            </div>
        </div>
    )
}
