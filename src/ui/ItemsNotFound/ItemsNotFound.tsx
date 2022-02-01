import styles from './ItemsNotFound.module.css'
// import noTeamsIcon from '../../assets/icon/illustration.svg'
import { ReactComponent as NoTeamsIcon } from '../../assets/icon/illustration.svg'

export const ItemsNotFound = () => {
  return (
    <div className={styles.itemsBlock}>
      <div className={styles.itemsContainer}>
        <NoTeamsIcon className={styles.img} />
        <div className={styles.textBlock}>
          <h2 className={styles.firstText}>Empty here</h2>
          <h3 className={styles.secondText}>Add new Teams to continue</h3>
        </div>
      </div>
    </div>
  )
}