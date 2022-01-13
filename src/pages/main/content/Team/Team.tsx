import styles from '../Content.module.css'

export const Team = () => {

  return (
    <div className={styles.mainContent}>
      <div className={styles.mainBlock}>
        <div className={styles.searchBlock}>
          <input />
          <button>button</button>
        </div>

        <div>
          teams
        </div>

        <div>
          paginate
        </div>
      </div>
    </div>
  )
}