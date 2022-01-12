import s from '../Content.module.css'

export const Team = () => {
  return (
    <div className={s.mainContent}>
      <div className={s.mainBlock}>
        <div className={s.searchBlock}>
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