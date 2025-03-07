'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container';
import { KpiResultsWidget } from '@/app/_widgets/kpi-results-widget'
import {ElectionResultsWidget} from '@/app/_widgets/election-results-widget'
const ElectionResultsPage: NextPage = () =>
{
  return (
    <Container>
          <KpiResultsWidget list={40} pollingCenter={40} votes={22} />
          <div className='mt-12'>
            <ElectionResultsWidget />
          </div>
    </Container>
  );
};

export default ElectionResultsPage;
