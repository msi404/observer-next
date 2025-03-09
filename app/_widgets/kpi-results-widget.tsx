'use client';
import {type FC} from 'react'
import { useStatistics } from '@/app/_hooks/use-statistics';
import { SkeletonCard } from '@/app/_components/skeleton-card'
import { ErrorCard } from '@/app/_components/error-card'
import { FetchCard } from '@/app/_components/fetch-card'
import {StatisticsCard} from '@/app/_components/custom/statistics-card'
import {Switch, Match} from '@/app/_components/utils/switch'
import {For} from '@/app/_components/utils/for'
import { Show } from '@/app/_components/utils/show'
import {Logs, TrendingUp} from 'lucide-react'

export const KpiResultsWidget: FC<{list: number, pollingCenter: number, votes: number}> = ({list, pollingCenter, votes}) =>
{
	const { statistics, refetch } = useStatistics();
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			  <For each={statistics}>
				 {(item) => (
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
							  description={item.description}
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

			<StatisticsCard icon={<Logs />} total={list} description='تسلسل القائمة حسب مكتب المحافظة'/>
			<StatisticsCard icon={<Logs />} total={pollingCenter} description='تسلسل القائمة حسب مركز التسجيل'/>
			<StatisticsCard icon={<TrendingUp />} total={votes} description='عدد اصوات القائمة'/>
			
			</section>
	)
}