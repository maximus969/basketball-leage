import paginatorStyles from './Paginator.module.css'
import ReactPaginate from 'react-paginate'
import { FC } from 'react'

export const Paginator: FC<PaginatorPropsType> = ({
    totalElementCount,
    pageSize,
    handlePageClick
}) => {
    const pageCount = Math.ceil(totalElementCount / pageSize)

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                nextClassName={paginatorStyles.next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                previousClassName={paginatorStyles.previous}
                renderOnZeroPageCount={undefined}
                className={paginatorStyles.container}
                activeClassName={paginatorStyles.activePageStyles}
                pageClassName={paginatorStyles.pageStyles}
            />
        </>
    )
}

type PaginatorPropsType = {
    totalElementCount: number
    pageSize: number
    handlePageClick: (event: { selected: number }) => void
}
