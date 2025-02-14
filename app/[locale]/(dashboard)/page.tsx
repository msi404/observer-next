'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/container';
import {
  candidatesActivitiesData,
} from '@/app/_utils/faker';
import {KpiWidget} from '@/app/_widgets/kpi-widget'
import { ComplaintsChartWidget } from '@/app/_widgets/complaints-chart-widget';
import { GenderChartWidget } from '@/app/_widgets/gender-chart-widget';
import { VoterStatesChartWidget } from '@/app/_widgets/voter-states-chart-widget';

const Home: NextPage = () => {

  return (
    <Container className="space-y-6">
      <KpiWidget />
      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <BasicChart
            chartData={candidatesActivitiesData}
            chartConfig={candidatesActivitiesChartConfig}
            dataKey="month"
            nameKey="candidatesActivities"
            title={t('home:charts.candidatesActivities.title')}
            description={t('home:charts.candidatesActivities.description')}
          /> */}
        <ComplaintsChartWidget />
        <GenderChartWidget />
      </section>
      <section>
        <VoterStatesChartWidget />
      </section>
    </Container>
  );
};

export default Home;