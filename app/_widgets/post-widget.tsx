'use client';
import { usePathname } from 'next/navigation';
import { Zoom } from '@/app/_components/zoom';
import { type FC } from 'react';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { usePostQuery } from '@/app/_services/fetchApi';
import { Show } from '@/app/_components/show';
import { Switch, Match } from '@/app/_components/switch';
import { Card } from '@/app/_components/ui/card';
import { motion } from 'motion/react';
import { RefreshCcw } from 'lucide-react';
import {EditPostFormSingle} from '@/app/_components/forms/edit-post-single-form'
import { Calendar } from 'lucide-react';
import { Post } from '@/app/_components/post';
import { formatDate } from '@/app/_utils/format-date';

export const PostWidget: FC = () => {
  const pathname = usePathname();
  const id = pathname.split('/').reverse().at(0);
  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    usePostQuery(id);

  return (
    <Card className="py-12 px-6">
      <div className="flex justify-between items-center">
        <Show when={isSuccess}>
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
          <Match when={isSuccess}>
            <section className="w-full">
              <Post
                Header={
                  <div className="mx-auto">
                    <Zoom
                      width={150}
                      height={150}
                      className="w-96 rounded-md border"
                      preview={data?.img}
                    />
                  </div>
                }
                Content={
                  <div className="space-y-3">
                    <h1>{data?.title}</h1>
                    <div className="flex gap-3">
                      <Calendar />
                      <p>{formatDate(data?.createdAt)}</p>
							 </div>
							 <div className='bg-secondary rounded-md p-4'>
								 <div dangerouslySetInnerHTML={{__html: data?.content}} />
							 </div>
                  </div>
                }
                Footer={
                  <div className="flex w-full">
                    <div>
                      <EditPostFormSingle item={data} />
                    </div>
                  </div>
                }
              />
            </section>
          </Match>
        </Switch>
      </div>
    </Card>
  );
};
