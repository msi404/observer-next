'use client';
import {useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { useGraph } from '@/app/_hooks/use-graph';
import { useCharts } from '@/app/_hooks/use-charts';
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import { Switch, Match } from '@/app/_components/switch';
import { StackChart } from '@/app/_components/stack-chart';
import { voterByAgeData, candidatesActivitiesData } from '@/app/_utils/faker';

export const VotersByAgeChartWidget = () => {
  const { t } = useTranslation();
  const { votersByAgeChartConfig } =
    useCharts();
  const {
    voterByAge,
    isErrorVoterByAge,
    isFetchingVoterByAge,
    isSuccessVoterByAge,
    isLoadingVoterByAge,
    refetchVoterByAge
  } = useGraph();

  useEffect( () =>
  {
    if ( !isLoadingVoterByAge )
    {
      console.log(voterByAge);
    }
  }, [isLoadingVoterByAge, isFetchingVoterByAge, voterByAge])

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
