'use client';
import { useMounted } from '@mantine/hooks'
import {resetPaginationState} from '@/app/_lib/features/paginationSlice'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentPage,
  selectPageSize,
  setTotalPages
} from '@/app/_lib/features/paginationSlice';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { ItemCard } from '@/app/_components/item-card';
import { usePollingCentersQuery } from '@/app/_services/fetchApi';
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
import { AddPollingCenterForm } from '@/app/_components/forms/add-polling-center-form';
import { Building } from 'lucide-react';
const Details: FC<{
  gov: string;
  pollingCenter: string;
  centers: number;
}> = ({ gov, pollingCenter, centers }) => {
  return (
    <div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>مركز التسجيل</h1>
        <h1>{pollingCenter}</h1>
      </div>
      <div className="flex justify-between rounded-lg p-2">
        <h1>مكتب المحافظة</h1>
        <h1>{gov}</h1>
      </div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>عدد المراكز</h1>
        <h1>{centers}</h1>
      </div>
    </div>
  );
};

export const PollingCentersWidget: FC = () =>
{
  const mounted = useMounted()
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const pathname = usePathname();
  const id = pathname.split('/').reverse().at(0);

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    usePollingCentersQuery(
      `PageNumber=${currentPage}&PageSize=${pageSize}&GovCenterId=${id}`
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
          <CardTitle>مكاتب المحافظات</CardTitle>
        </CardHeader>
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
          <AddPollingCenterForm govCenter={id} />
        </div>
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
          <Match when={isSuccess}>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={data?.items}>
                {(item: any) => (
                  <ItemCard
                    Header={<Building size={70} />}
                    Content={
                      <Details
                        gov={item.govCenter.gov.name}
                        pollingCenter={item.name}
                        centers={12}
                      />
                    }
                    Footer={
                      <div className='flex justify-between gap-1 w-full'>
                        <Link className='flex-1' href={`polling-management/${item.id}`}>
                          <Button className='w-full'>عرض مراكز الاقتراع</Button>
                        </Link>
                        <Button variant='ghost'>تعديل</Button>
                      </div>
                    }
                  />
                )}
              </For>
            </section>
          </Match>
        </Switch>
      </div>
      <CardFooter>
        <DynamicPagination />
      </CardFooter>
    </Card>
  );
};
