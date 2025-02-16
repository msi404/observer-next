'use client';
import { useTranslation } from 'react-i18next';
import { useGraph } from '@/app/_hooks/use-graph';
import { useCharts } from '@/app/_hooks/use-charts';
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { Switch, Match } from '@/app/_components/switch';
import { BasicChart } from '@/app/_components/basic-chart';
import { candidatesActivitiesData } from '@/app/_utils/faker';

export const CandidatesActivitiesChartWidget = () => {
  const { t } = useTranslation();
  const { candidatesActivitiesChartConfig } = useCharts();

  const {
    candidatesActivites,
    isErrorCandidates,
    isFetchingCandidates,
    isSuccessCandidates,
    isLoadingCandidates,
    refetchCandidates
  } = useGraph();
  return (
    <Switch>
      <Match when={isErrorCandidates}>
        <ErrorCard retry={refetchCandidates} />
      </Match>
      <Match when={isLoadingCandidates}>
        <SkeletonCard />
      </Match>
      <Match when={isFetchingCandidates}>
        <FetchCard className='h-[33rem]'/>
      </Match>
      <Match when={isSuccessCandidates}>
        <BasicChart
          retry={refetchCandidates}
          chartData={candidatesActivitiesData}
          chartConfig={candidatesActivitiesChartConfig}
          dataKey="month"
          nameKey="candidatesActivities"
          title={t('home:charts.candidatesActivities.title')}
          description={t('home:charts.candidatesActivities.description')}
        />
      </Match>
    </Switch>
  );
};
