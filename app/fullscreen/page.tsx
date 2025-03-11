import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container';
import { ComplaintsChartWidget } from '@/app/_widgets/fullscreen/complaints-chart-widget';
import { GenderChartWidget } from '@/app/_widgets/fullscreen/gender-chart-widget';
import { VoterStatesChartWidget } from '@/app/_widgets/fullscreen/voter-states-chart-widget';
import { VotersByAgeChartWidget } from '@/app/_widgets/fullscreen/voters-by-age-chart-widget';
import { CandidatesActivitiesChartWidget } from '@/app/_widgets/fullscreen/candidates-activities-chart';

const FullscreenPage: NextPage = () => {
  return (
    <Container className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ComplaintsChartWidget />
        <GenderChartWidget />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VotersByAgeChartWidget />
        <CandidatesActivitiesChartWidget />
      </section>
      <section className='grid gap-4'>
        <VoterStatesChartWidget />
      </section>
    </Container>
  );
};
export default FullscreenPage;
