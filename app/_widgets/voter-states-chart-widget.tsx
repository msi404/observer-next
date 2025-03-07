'use client';
import { useGraph } from '@/app/_hooks/use-graph';
import {votersPerStateChartConfig} from '@/app/_config/chart-config'
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { Switch, Match } from '@/app/_components/utils/switch';
import { TwinChart } from '@/app/_components/custom/twin-chart';

export const VoterStatesChartWidget = () => {
  const {
    voters,
    isErrorVoters,
    isLoadingVoters,
    isFetchingVoters,
    isSuccessVoters,
    refetchVoters
  } = useGraph();
  return (
    <Switch>
      <Match when={isErrorVoters}>
        <ErrorCard retry={refetchVoters} />
      </Match>
      <Match when={isLoadingVoters}>
        <SkeletonCard />
      </Match>
      <Match when={isFetchingVoters}>
        <FetchCard className='h-[50rem]'/>
      </Match>
      <Match when={isSuccessVoters}>
        <TwinChart
          retry={refetchVoters}
          chartData={voters}
          chartConfig={votersPerStateChartConfig}
          formatLabel={false}
          dataKey="governorate"
          nameKeyOne="confirmedVoters"
          nameKeyTwo="possibleVoters"
          title='توزيع الناخبين حسب المحافظة'
          description='توزيع الناخبين في مراكز الاقتراع والمحطات الانتخابية حسب المحافظة'
        />
      </Match>
    </Switch>
  );
};
