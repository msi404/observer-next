'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectTotalPages,
  setCurrentPage
} from '@/app/_lib/features/paginationSlice';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/app/_components/ui/pagination';
import { Button } from '@/app/_components/ui/button';
import { Show } from '@/app/_components/utils/show';

export const DynamicPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const visiblePagesCount = 4; // Show 4 pages before last page
  const skipAmount = 10; // How many pages to skip

  // Determine the start of the visible range
  let startPage = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
  let endPage = startPage + visiblePagesCount - 1;

  // Ensure we don't go beyond the last page
  if (endPage >= totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - visiblePagesCount);
  }

  // Generate page numbers to show
  const pagesToShow = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Pagination className="flex items-center justify-between mt-10">
      <PaginationContent className="flex items-center">
        {/* Previous Button */}
        <Show when={currentPage !== 1}>
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)}>
              Previous
            </PaginationPrevious>
          </PaginationItem>
        </Show>

        {/* Skip 10 Back */}
        <Show when={currentPage > skipAmount}>
          <PaginationItem>
            <Button variant="outline" onClick={() => onPageChange(Math.max(1, currentPage - skipAmount))}>
              « تخطي 10
            </Button>
          </PaginationItem>
        </Show>

        {/* First Page Always Visible */}
        <Show when={startPage > 1}>
          <PaginationItem>
            <Button
              variant={1 === currentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
          </PaginationItem>
          <span className="mx-2">...</span>
        </Show>

        {/* Dynamic Range of Pages */}
        {pagesToShow.map(page => (
          <PaginationItem key={page}>
            <Button
              className='mx-2'
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        {/* Last Page Always Visible */}
        <Show when={totalPages > 1 && currentPage !== totalPages}>
          <span className="mx-2">...</span>
          <PaginationItem>
            <Button
              variant={totalPages === currentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </PaginationItem>
        </Show>

        {/* Skip 10 Forward */}
        <Show when={currentPage + skipAmount < totalPages}>
          <PaginationItem>
            <Button variant="outline" onClick={() => onPageChange(Math.min(totalPages, currentPage + skipAmount))}>
              تخطي 10 »
            </Button>
          </PaginationItem>
        </Show>

        {/* Next Button */}
        <Show when={totalPages !== currentPage}>
          <PaginationItem className='cursor-pointer'>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)}>
              Next
            </PaginationNext>
          </PaginationItem>
        </Show>
      </PaginationContent>
    </Pagination>
  );
};
