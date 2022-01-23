import styles from './BoxPreview.module.css'

export const BoxPreview = ({ name, foundationYear, imageUrl, onClick }: BoxPreviewPropsType) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.imgBlock}>
        <img className={styles.img} src={imageUrl} />
      </div>
      <div className={styles.textBlock}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{name}</h2>
          <h3 className={styles.info}>Year of foundation: {foundationYear}</h3>
        </div>
      </div>
    </div>
  )
}

type BoxPreviewPropsType = {
  name: string
  foundationYear: number
  imageUrl: string
  onClick: () => void
}