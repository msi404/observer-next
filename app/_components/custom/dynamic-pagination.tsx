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
import {Show} from '@/app/_components/utils/show'
import { For } from '@/app/_components/utils/for';

export const DynamicPagination = () =>
{
	const dispatch = useDispatch()
	const currentPage = useSelector( selectCurrentPage )
	const totalPages = useSelector( selectTotalPages )
  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  };
  return (
    <Pagination className="flex items-center justify-between mt-10">
      <PaginationContent className="flex items-center">
        <Show when={currentPage !== 1}>
        <PaginationItem className='cursor-pointer'>
          <PaginationPrevious onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </PaginationPrevious>
        </PaginationItem>
       </Show>
        <PaginationItem className='flex max-w-[800px] overflow-x-auto no-scrollbar'>
          <For each={Array.from({ length: totalPages }, (_, i) => i + 1)}>
            {(page: number) => (
              <Button
                className='mx-2'
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => onPageChange(page)}
                key={page + 1}
              >
                {page}
              </Button>
            )}
          </For>
        </PaginationItem>
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
