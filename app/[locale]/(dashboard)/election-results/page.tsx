'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/container';
import { KpiWidget } from '@/app/_widgets/kpi-widget'
import {ElectionResultsWidget} from '@/app/_widgets/election-results-widget'
const ElectionResultsPage: NextPage = () =>
{
  return (
    <Container>
          <KpiWidget />
          <div className='mt-12'>
            <ElectionResultsWidget />
          </div>
    </Container>
  );
};

export default ElectionResultsPage;
