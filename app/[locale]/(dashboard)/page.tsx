'use client';
import { type NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useStatistics } from '@/app/_hooks/use-statistics';
import { useCharts } from '@/app/_hooks/use-charts';
import { StatisticsCard } from '@/app/_components/statistics-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { Container } from '@/app/_components/container';
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import { Switch, Match } from '@/app/_components/switch';
import {
  candidatesActivitiesData,
} from '@/app/_utils/faker';
import { ComplaintsChartWidegt } from '@/app/_widgets/complaints-chart-widget';
import { GenderChartWidget } from '@/app/_widgets/gender-chart-widget';
import { VoterStatesChartWidget } from '@/app/_widgets/voter-states-chart-widget';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { statistics, refetch } = useStatistics();

  return (
    <Container className="space-y-6">
      {/* Data Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={statistics}>
          {(item, index) => (
            <Show when={item.permission}>
              <Switch>
                <Match when={item.isLoading}>
                  <SkeletonCard />
                </Match>
                <Match when={item.isError}>
                  <ErrorCard retry={refetch} />
                </Match>
                <Match when={item.isSuccess}>
                  <StatisticsCard
                    url={item.url}
                    icon={item.icon}
                    description={t(item.description)}
                    total={item.total}
                  />
                </Match>
                <Match when={item.isFetching}>
                  <FetchCard />
                </Match>
              </Switch>
            </Show>
          )}
        </For>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <BasicChart
            chartData={candidatesActivitiesData}
            chartConfig={candidatesActivitiesChartConfig}
            dataKey="month"
            nameKey="candidatesActivities"
            title={t('home:charts.candidatesActivities.title')}
            description={t('home:charts.candidatesActivities.description')}
          /> */}
        <ComplaintsChartWidegt />
        <GenderChartWidget />
      </section>
      <section>
        <VoterStatesChartWidget />
      </section>
    </Container>
  );
};

export default Home;
