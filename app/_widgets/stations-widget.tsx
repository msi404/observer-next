'use client';
import { useMounted } from '@mantine/hooks'
import { resetPaginationState } from '@/app/_lib/features/paginationSlice'
import {hasPermission} from '@/app/_auth/auth-rbac'
import { usePathname } from 'next/navigation';
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
import { ItemCard } from '@/app/_components/item-card';
import { useStationsQuery } from '@/app/_services/fetchApi';
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
import { RefreshCcw } from 'lucide-react';
import { DynamicPagination } from '@/app/_components/custom/dynamic-pagination';
import { AddStationForm } from '@/app/_components/forms/add-station-form'
import {EditStationForm} from '@/app/_components/forms/edit-station-form'
import { Vote } from 'lucide-react';
import { Show } from '@/app/_components/utils/show'
import { BackButton } from '@/app/_components/ui/back-button'

const Details: FC<{
  serial: string;
  photos: string;
}> = ({serial, photos}) => {
  return (
    <div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>رقم المحطة الانتخابية</h1>
        <h1>{serial}</h1>
      </div>
      <div className="flex justify-between rounded-lg p-2">
        <h1>عدد الصور الملتقطة</h1>
        <h1>{photos}</h1>
      </div>
    </div>
  );
};

export const StationsWidget: FC = () =>
{
  const mounted = useMounted()
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const pathname = usePathname();
  const pollingManagementId = pathname.split( '/stations' ).at(0)
  const id = pathname.split('/').reverse().at(0);
  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useStationsQuery(
      `PageNumber=${currentPage}&PageSize=${pageSize}&PollingCenterId=${id}`
    );

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
          <div className='flex justify-center items-center gap-4'>
            <BackButton backLink={pollingManagementId} />
            <CardTitle>المحطات</CardTitle>
        </div>
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
          <Show when={hasPermission(user, 'view:addStation')}>
            <AddStationForm pollingCenter={id} />
          </Show>
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
          <EmptyCard
            permission="view:addStation"
              Add={ <AddStationForm pollingCenter={id} />}
            retry={refetch}
          />
        </Match>
        <Match when={isSuccess && data.items.length > 0}>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <For each={data?.items}>
              {(item: any) => (
                <ItemCard
                  Header={<Vote size={70} />}
                  Content={
                    <Details
                      serial={item.serial}
                      photos={item.totalObservers}
                    />
                  }
                  Footer={
                    <div className="flex justify-between gap-3 w-full">
                      <div>
                        <Show when={hasPermission(user, 'view:addStation')}>
                          <EditStationForm item={item} />
                        </Show>
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
