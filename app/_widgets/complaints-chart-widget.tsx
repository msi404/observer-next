'use client';
import { useMemo } from 'react';
import { useGraph } from '@/app/_hooks/use-graph';
import { useCharts } from '@/app/_hooks/use-charts';
import { PiChart } from '@/app/_components/pi-chart';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonPiChart } from '@/app/_components/skeleton-pi-chart';
import { Switch, Match } from '@/app/_components/switch';

export const ComplaintsChartWidget = () =>
{
  const {
    complaints,
    isErrorComplaints,
    isFetchingComplaints,
    isLoadingComplaints,
    isSuccessComplaints,
    refetchComplaints
  } = useGraph();

  const { issuesChartConfig } = useCharts();

  const totalIssues = useMemo(() => {
    return complaints?.reduce((acc, curr) => acc + curr.total, 0);
  }, [isLoadingComplaints, complaints]);
  return (
    <Switch>
      <Match when={isErrorComplaints}>
        <ErrorCard retry={refetchComplaints} />
      </Match>
      <Match when={isFetchingComplaints}>
        <FetchCard className='h-[33rem]'/>
      </Match>
      <Match when={isLoadingComplaints}>
        <SkeletonPiChart />
      </Match>
		  <Match when={ isSuccessComplaints }>
        <PiChart
          retry={refetchComplaints}
            total={totalIssues}
            chartConfig={issuesChartConfig}
            chartData={complaints}
            dataKey="total"
            nameKey="type"
            title='عدد الشكاوى'
            description='عدد الشكاوى التي تم الرد عليها والتي لم يتم الرد عليه'
            label='شكوى'
          />
		</Match>
    </Switch>
  );
};
