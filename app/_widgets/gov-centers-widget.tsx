'use client';
import { useMounted } from '@mantine/hooks'
import {resetPaginationState} from '@/app/_lib/features/paginationSlice'
import Link from 'next/link';
import { type FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize,
  setTotalPages
} from '@/app/_lib/features/paginationSlice';
import {EmptyCard} from '@/app/_components/empty-card'
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { ItemCard } from '@/app/_components/item-card';
import { useGovCentersQuery } from '@/app/_services/fetchApi';
import {Show} from '@/app/_components/show'
import { Switch, Match } from '@/app/_components/switch';
import { For } from '@/app/_components/for';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { motion } from 'motion/react';
import { RefreshCcw } from 'lucide-react';
import { DynamicPagination } from '@/app/_components/dynamic-pagination';
import { AddGovCenterForm } from '@/app/_components/forms/add-gov-center-form';
import { EditGovCenterForm } from '@/app/_components/forms/edit-gov-center-form';
import { Landmark } from 'lucide-react';

const Details: FC<{
  gov: string;
  pollingCenters: number;
  observers: number;
}> = ( { gov, pollingCenters, observers } ) =>
{
  return (
    <div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>مكتب المحافظة</h1>
        <h1>{gov}</h1>
      </div>
      <div className="flex justify-between rounded-lg p-2">
        <h1>عدد مراكز التسجيل</h1>
        <h1>{pollingCenters}</h1>
      </div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>عدد المراقبين للمحافظة</h1>
        <h1>{observers}</h1>
      </div>
    </div>
  );
};

export const GovCentersWidget: FC = () => {
  const dispatch = useDispatch();
  const mounted = useMounted()
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useGovCentersQuery(`PageNumber=${currentPage}&PageSize=${pageSize}`);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setTotalPages(data?.totalPages));
    }
  }, [ isLoading, data, dispatch ] );
  
  useEffect( () =>
    {
      if ( mounted )
      {
        dispatch(resetPaginationState())
      }
    }, [mounted])
  

  return (
    <Card className="py-12 px-6">
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>مكاتب المحافظات</CardTitle>
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
          <AddGovCenterForm />
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
            <EmptyCard Add={<AddGovCenterForm />} retry={refetch} />
          </Match>
          <Match when={isSuccess && data.items.length > 0}>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={data?.items}>
                {(item: any) => (
                  <ItemCard
                    Header={<Landmark size={70} />}
                    Content={
                      <Details
                        gov={item.gov.name}
                        pollingCenters={12}
                        observers={12}
                      />
                    }
                    Footer={
                      <div className="flex justify-between gap-3 w-full">
                        <Link
                          className="flex-1"
                          href={`polling-management/${item.id}`}
                        >
                          <Button className="w-full">عرض مراكز التسجيل</Button>
                        </Link>
                        <div>
                          <EditGovCenterForm item={item} />
                        </div>
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
