import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate"

export const Paginator = ({ items, itemsPerPage }: PaginatorPropsType) => {
  const [currentItems, setCurrentItems] = useState<number[] | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </>
  )
}

type PaginatorPropsType = {
  items: any
  itemsPerPage: number
  // setCurrentItems: Dispatch<SetStateAction<any>>
}