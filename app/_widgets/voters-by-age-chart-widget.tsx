'use client';
import { useGraph } from '@/app/_hooks/use-graph';
import {votersByAgeChartConfig} from '@/app/_config/chart-config'
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { Switch, Match } from '@/app/_components/utils/switch';
import { StackChart } from '@/app/_components/custom/stack-chart';

export const VotersByAgeChartWidget = () => {
  const {
    voterByAge,
    isErrorVoterByAge,
    isFetchingVoterByAge,
    isSuccessVoterByAge,
    isLoadingVoterByAge,
    refetchVoterByAge
  } = useGraph();

  return (
    <Switch>
      <Match when={isErrorVoterByAge}>
        <ErrorCard retry={refetchVoterByAge} />
      </Match>
      <Match when={isLoadingVoterByAge}>
        <SkeletonCard />
      </Match>
      <Match when={isFetchingVoterByAge}>
        <FetchCard className="h-[33rem]" />
      </Match>
      <Match when={isSuccessVoterByAge}>
        <StackChart
          retry={refetchVoterByAge}
          dataKey="age"
          formatLabel={false}
          nameKeyOne="confirmedVoters"
          nameKeyTwo="possibleVoters"
          chartConfig={votersByAgeChartConfig}
          chartData={voterByAge}
          title="اعمار الناخبين"
          description="معدل اعمار الناخبين"
        />
      </Match>
    </Switch>
  );
};
