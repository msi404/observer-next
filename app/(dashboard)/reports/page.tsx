import { type NextPage } from 'next'
import { Container } from '@/app/_components/containers/container';
import { KpiWidget } from '@/app/_widgets/kpi-widget'
import { ComplaintsChartWidget } from '@/app/_widgets/complaints-chart-widget';
import { GenderChartWidget } from '@/app/_widgets/gender-chart-widget';
import { VoterStatesChartWidget } from '@/app/_widgets/voter-states-chart-widget';
import {ElectionResultsWidget} from '@/app/_widgets/election-results-widget'
import { VotersByAgeChartWidget } from '@/app/_widgets/voters-by-age-chart-widget'
import { CandidatesActivitiesChartWidget } from '@/app/_widgets/candidates-activities-chart'

const ReportsPage: NextPage = () =>
{
	return (
		<Container className='space-y-6'>
			<KpiWidget />
			<section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<ComplaintsChartWidget />
				<GenderChartWidget/>
			</section>
			<section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<VotersByAgeChartWidget />
				<CandidatesActivitiesChartWidget />
			</section>
			<section>
				<VoterStatesChartWidget />
			</section>
			<section>
				<ElectionResultsWidget />
			</section>
		</Container>
	)
};
export default ReportsPage