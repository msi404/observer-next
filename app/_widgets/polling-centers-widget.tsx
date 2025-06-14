/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMounted } from '@mantine/hooks'
import { resetPaginationState } from '@/app/_lib/features/paginationSlice'
import {hasPermission} from '@/app/_auth/auth-rbac'
import Link from 'next/link';
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
import { usePollingCentersQuery } from '@/app/_services/fetchApi';
import { Switch, Match } from '@/app/_components/utils/switch';
import { For } from '@/app/_components/utils/for';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Retry } from '@/app/_components/custom/retry';
import { DynamicPagination } from '@/app/_components/custom/dynamic-pagination';
import { AddPollingCenterForm } from '@/app/_components/forms/add-polling-center-form';
import {EditPollingCenterForm} from '@/app/_components/forms/edit-polling-center-form'
import { Building } from 'lucide-react';
import {BackButton} from '@/app/_components/ui/back-button'
import { Show } from '@/app/_components/utils/show'
import {formatter} from '@/app/_utils/format-number'

const Details: FC<{
  pollingCenter: string;
  observers: number;
  stations: number;
  serial: number
}> = ({ pollingCenter, observers, stations, serial }) => {
  return (
    <div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>المركز الانتخابي</h1>
        <h1>{pollingCenter}</h1>
      </div>
      <div className="flex justify-between rounded-lg p-2">
        <h1>عدد المحطات الانتخابية</h1>
        <h1>{formatter(stations)}</h1>
      </div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>عدد الوكلاء للمركز</h1>
        <h1>{formatter(observers)}</h1>
      </div>
      <div className="flex justify-between rounded-lg p-2">
        <h1>رمز مركز التسجيل</h1>
        <h1>{serial}</h1>
      </div>
    </div>
  );
};

export const PollingCentersWidget: FC = () =>
{
  const mounted = useMounted()
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const pathname = usePathname();
  const id = pathname.split('/').reverse().at(0);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    usePollingCentersQuery(
      `PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}&GovCenterId=${id}`
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
          <BackButton backLink='/polling-management'/>
          <CardTitle>مراكز التسجيل</CardTitle>
        </div>
      </CardHeader>
      <Show when={isSuccess && data.items.length > 0}>
        <div>
        <Retry refetch={refetch}/>
          <Show when={hasPermission(user, 'view:addPollingCenter')}>
            <AddPollingCenterForm govCenter={id} />
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
            permission="view:addPollingCenter"
              Add={ <AddPollingCenterForm govCenter={id} />}
            retry={refetch}
          />
        </Match>
        <Match when={isSuccess && data.items.length > 0}>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <For each={data?.items}>
              {(item: any) => (
                <ItemCard
                  Header={<Building size={70} />}
                  Content={
                    <Details
                      pollingCenter={item.name}
                      stations={item.totalPollingCenters}
                      observers={ item.totalObservers }
                      serial={item.serial}
                    />
                  }
                  Footer={
                    <div className="flex justify-between gap-3 w-full">
                      <Link
                        className="flex-1"
                        href={`${id}/stations/${item.id}`}
                      >
                        <Button className="w-full">عرض المحطات الانتخابية</Button>
                      </Link>
                      <div>
                        <Show when={hasPermission(user, 'view:addPollingCenter')}>
                          <EditPollingCenterForm item={item} />
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
