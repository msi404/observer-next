'use client';
import { type NextPage } from 'next';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { useTranslation } from 'react-i18next';
import {FetchCard} from '@/app/_components/fetch-card'
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import { Switch, Match } from '@/app/_components/switch'
import { StatisticsCard } from '@/app/_components/statistics-card';
import {ErrorCard} from '@/app/_components/error-card'
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { useStatistics } from '@/app/_hooks/use-statistics';
import { Container } from '@/app/_components/container';
import {ElectionResultsWidget} from '@/app/_widgets/election-results-widget'
const ElectionResultsPage: NextPage = () =>
{
    const { t } = useTranslation();
  const { electionResultsStatistics, refetch } = useStatistics();
  return (
    <Container>
           {/* Data Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={electionResultsStatistics}>
                { ( item, index ) => (
                  <Show when={item.permission}>
                     <Switch>
                    <Match when={item.isLoading}>
                        <SkeletonCard />
                    </Match>
                    <Match when={item.isError}>
                      <ErrorCard retry={refetch}/>
                    </Match>
                    <Match when={item.isSuccess}>
                      <StatisticsCard
                      icon={item.icon}
                      description={t(item.description)}
                      total={item.total}
                    />
                    </Match>
                    <Match when={item.isFetching}>
                    <FetchCard/>
                    </Match>
                  </Switch>
                 </Show>
                )}
              </For>
            </section>
          <div className='mt-12'>
            <ElectionResultsWidget />
          </div>
    </Container>
  );
};

export default ElectionResultsPage;
