/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMounted } from '@mantine/hooks'
import {resetPaginationState} from '@/app/_lib/features/paginationSlice'
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
import { useElectoralEntitiesQuery } from '@/app/_services/fetchApi';
import {Show} from '@/app/_components/utils/show'
import { Switch, Match } from '@/app/_components/utils/switch';
import { For } from '@/app/_components/utils/for';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/app/_components/ui/card';
import { motion } from 'motion/react';
import { RefreshCcw } from 'lucide-react';
import { DynamicPagination } from '@/app/_components/custom/dynamic-pagination';
import { AddElectoralEntityForm } from '@/app/_components/forms/add-electoral-entity-form'
import {EditElectoralEntityForm} from '@/app/_components/forms/edit-electoral-entity-form'
import { Component } from 'lucide-react';

const Details: FC<{
  name: string
}> = ( { name } ) =>
{
  return (
    <div>
      <div className="flex justify-between bg-slate-100 rounded-lg p-2">
        <h1>اسم الكيان</h1>
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export const ElectoralEntitiesWidget: FC = () => {
  const dispatch = useDispatch();
  const mounted = useMounted()
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useElectoralEntitiesQuery(`PageNumber=${currentPage}&PageSize=${pageSize}`);

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
          <CardTitle>الكيانات السياسية</CardTitle>
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
            <RefreshCcw size="25px" />
          </motion.button>
          <AddElectoralEntityForm />
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
            <EmptyCard permission='view:addElectoralEnttity' Add={<AddElectoralEntityForm />} retry={refetch} />
          </Match>
          <Match when={isSuccess && data.items.length > 0}>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={data?.items}>
                {(item: any) => (
                  <ItemCard
                    Header={<Component size={70} />}
                    Content={
                      <Details
                        name={item.name}
                      />
                    }
                    Footer={
                      <div className="flex justify-between gap-3 w-full">
                        <div>
                          <EditElectoralEntityForm item={item} />
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
