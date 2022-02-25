import { FC } from 'react'
import styles from './BoxPreview.module.css'

export const BoxPreview: FC<BoxPreviewPropsType> = ({
    name,
    date,
    imageUrl,
    item,
    onClick
}) => {
    const playerStyles = item === 'player' ? styles.imgPlayerBlock : ''
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={`${styles.imgBlock} ${playerStyles}`}>
                <img
                    className={
                        item === 'team' ? styles.imgTeam : styles.imgPlayer
                    }
                    src={imageUrl}
                    alt=""
                />
            </div>
            <div className={styles.textBlock}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>
                        {name}
                        {item === 'player' ? (
                            <span
                                className={styles.numberStyles}
                            >{` #${date}`}</span>
                        ) : (
                            ''
                        )}
                    </h2>
                    <h3 className={styles.info}>
                        {item === 'team' ? `Year of foundation: ` : ''}
                        {date}
                    </h3>
                </div>
            </div>
        </div>
    )
}

type BoxPreviewPropsType = {
    name: string
    date: number
    imageUrl: string
    item: 'team' | 'player'
    onClick: () => void
}
