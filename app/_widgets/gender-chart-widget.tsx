'use client';
import {useMemo} from 'react'
import { useGraph } from '@/app/_hooks/use-graph';
import { useCharts } from '@/app/_hooks/use-charts';
import { PiChart } from '@/app/_components/pi-chart';
import { ErrorCard } from '@/app/_components/error-card';
import { FetchCard } from '@/app/_components/fetch-card';
import { SkeletonPiChart } from '@/app/_components/skeleton-pi-chart';
import {Switch, Match} from '@/app/_components/switch'

export const GenderChartWidget = () =>
{
	const {
		genders,
		isErrorGenders,
		isLoadingGenders,
		isFetchingGenders,
		isSuccessGenders,
		refetchGenders
	 } = useGraph();
  
	const { gendersChartConfig } = useCharts();

	  const totalGenders = useMemo(() => {
		 return genders?.reduce((acc, curr) => acc + curr.total, 0);
	  }, [isLoadingGenders, genders]);
	return (
		<Switch>
			<Match when={isErrorGenders}>
				<ErrorCard retry={refetchGenders}/>
			</Match>
			<Match when={isFetchingGenders}>
				<FetchCard className='h-[33rem]'/>
			</Match>
			<Match when={isLoadingGenders}>
				<SkeletonPiChart />
			</Match>

			<Match when={isSuccessGenders}>
				<PiChart
					retry={refetchGenders}
					total={totalGenders}
            chartConfig={gendersChartConfig}
            chartData={genders}
            dataKey="total"
            nameKey="type"
            title='الناخبين حسب الجنس'
            description='العدد الكلي والجزئي للناخبين حسب الجنس'
            label='شخص'
          />
			</Match>
		</Switch>
	)
}