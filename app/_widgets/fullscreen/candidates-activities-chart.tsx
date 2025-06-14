'use client';
import { useGraph } from '@/app/_hooks/use-graph';
import {candidatesActivitiesChartConfig} from '@/app/_config/chart-config'
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { Switch, Match } from '@/app/_components/utils/switch';
import { BasicChart } from '@/app/_widgets/fullscreen/components/basic-chart';

export const CandidatesActivitiesChartWidget = () => {
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
      {/* <Match when={isLoadingCandidates}>
        <SkeletonCard />
      </Match>
      <Match when={isFetchingCandidates}>
        <FetchCard className='h-[33rem]'/>
      </Match> */}
      <Match when={isSuccessCandidates}>
        <BasicChart
          chartData={candidatesActivites}
          chartConfig={candidatesActivitiesChartConfig}
          dataKey="month"
          nameKey="candidatesActivities"
          title='نشاطات المرشحين'
          description='ملخص لنشاط المرشحين خلال السنة'
        />
      </Match>
    </Switch>
  );
};
