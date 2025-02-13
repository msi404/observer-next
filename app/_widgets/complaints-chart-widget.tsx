'use client';
import { useMemo } from 'react';
import {useTranslation} from 'react-i18next'
import { useGraph } from '@/app/_hooks/use-graph';
import { useCharts } from '@/app/_hooks/use-charts';
import { PiChart } from '@/app/_components/pi-chart';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonPiChart } from '@/app/_components/skeleton-pi-chart';
import {issuesChartData} from '@/app/_utils/faker'
import { Switch, Match } from '@/app/_components/switch';

export const ComplaintsChartWidegt = () =>
{
	const {t} = useTranslation()
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
    return issuesChartData?.reduce((acc, curr) => acc + curr.total, 0);
  }, [isLoadingComplaints, complaints]);
  return (
    <Switch>
      <Match when={isErrorComplaints}>
        <ErrorCard retry={refetchComplaints} />
      </Match>
      <Match when={isFetchingComplaints}>
        <FetchCard />
      </Match>
      <Match when={isLoadingComplaints}>
        <SkeletonPiChart />
      </Match>
		  <Match when={ isSuccessComplaints }>
		  <PiChart
            total={totalIssues}
            chartConfig={issuesChartConfig}
            chartData={complaints}
            dataKey="total"
            nameKey="type"
            title={t('home:charts.issuesNumber.title')}
            description={t('home:charts.issuesNumber.description')}
            label={t('home:charts.issuesNumber.label')}
          />
		</Match>
    </Switch>
  );
};
