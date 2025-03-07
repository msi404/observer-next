'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container';
import { KpiWidget } from '@/app/_widgets/kpi-widget'
import {VotersByAgeChartWidget} from '@/app/_widgets/voters-by-age-chart-widget'
import {CandidatesActivitiesChartWidget} from '@/app/_widgets/candidates-activities-chart'
import { ComplaintsChartWidget } from '@/app/_widgets/complaints-chart-widget';
import { GenderChartWidget } from '@/app/_widgets/gender-chart-widget';
import { VoterStatesChartWidget } from '@/app/_widgets/voter-states-chart-widget';

const Home: NextPage = () =>
{
  return (
    <Container className="space-y-6">
      <KpiWidget />
      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VotersByAgeChartWidget />
        <ComplaintsChartWidget />
        <GenderChartWidget />
        <CandidatesActivitiesChartWidget />
      </section>
      <section>
        <VoterStatesChartWidget />
      </section>
    </Container>
  );
};

export default Home;