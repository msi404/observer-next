'use client';
import { useMounted } from '@mantine/hooks';
import { resetPaginationState } from '@/app/_lib/features/paginationSlice';
import { Zoom } from '@/app/_components/custom/zoom';
import Link from 'next/link';
import { type FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentPage,
  selectPageSize,
  setTotalPages
} from '@/app/_lib/features/paginationSlice';
import { EmptyCard } from '@/app/_components/empty-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { usePostsQuery } from '@/app/_services/fetchApi';
import { Show } from '@/app/_components/utils/show';
import { Switch, Match } from '@/app/_components/utils/switch';
import { For } from '@/app/_components/utils/for';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { motion } from 'motion/react';
import { PenSquare, RefreshCcw } from 'lucide-react';
import { DynamicPagination } from '@/app/_components/custom/dynamic-pagination';
import { AddPostForm } from '@/app//_components/forms/add-post-form';
import { Calendar } from 'lucide-react';
import { Post } from '@/app/_components/custom/post';
import { formatDate } from '@/app/_utils/format-date';

export const CurrentCandidatePostsWidget: FC = () =>
{
	const currentUser = useSelector(selectUser)
  const dispatch = useDispatch();
  const mounted = useMounted();
  const currentPage = useSelector(selectCurrentPage);
	const pageSize = useSelector( selectPageSize );

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    usePostsQuery(`UserId=${currentUser.id}&PageNumber=${currentPage}&PageSize=${pageSize}`);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setTotalPages(data?.totalPages));
    }
  }, [ isLoading, data, dispatch ] );
	

  useEffect(() => {
    if (mounted) {
      refetch();
      dispatch(resetPaginationState());
    }
  }, [mounted]);

  return (
    <Card className="py-12 px-6">
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>الفعاليات</CardTitle>
        </CardHeader>
        <Show when={isSuccess && data.items.length > 0}>
          <div>
            <motion.button
              onClick={refetch}
              whileHover={{
                scale: 1.1,
                transition: {
                  damping: 0,
                  ease: 'linear',
                  duration: 0.2
                }
              }}
              className="bg-slate-200 p-4 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
            >
              <RefreshCcw size="35px" />
            </motion.button>
            <Link href='/events/editor'>
              <motion.button
            whileHover={{
              scale: 1.1,
              transition: { damping: 0, ease: 'linear', duration: 0.2 }
            }}
            className="bg-slate-200 p-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <PenSquare size="35px" />
          </motion.button>
            </Link>
          </div>
        </Show>
      </div>
      <div className="mt-6">
        <Switch>
          <Match when={isError}>
            <ErrorCard retry={refetch} />
          </Match>
          <Match when={isFetching}>
            <FetchCard />
          </Match>
          <Match when={isLoading}>
            <SkeletonCard />
          </Match>
          <Match when={isSuccess && data.items.length === 0}>
            <EmptyCard permission='view:addCandidate' Add={<AddPostForm />} retry={refetch} />
          </Match>
          <Match when={isSuccess && data.items.length > 0}>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={data?.items}>
                {(item: any) => (
                  <Post
                    Header={
                      <Zoom
                        width={150}
                        height={150}
                        className="w-72 rounded-md border"
                        preview={item.img}
                      />
                    }
                    Content={
                      <div className="space-y-3">
                        <h1>{item.title}</h1>
                        <div className="flex gap-3">
                          <Calendar />
                          <p>{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                    }
                    Footer={
                      <div className="flex justify-between gap-3 w-full">
                        <Link className="flex-1" href={`events/${item.id}`}>
                          <Button className="w-full">عرض</Button>
                        </Link>
                      </div>
                    }
                  />
                )}
              </For>
            </section>
          </Match>
        </Switch>
      </div>
      <Show when={isSuccess && data.items.length > 0}>
        <CardFooter>
          <DynamicPagination />
        </CardFooter>
      </Show>
    </Card>
  );
};
