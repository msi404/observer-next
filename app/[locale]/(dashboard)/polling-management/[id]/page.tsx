'use client';
import { type NextPage } from 'next';
import {Container} from '@/app/_components/container'
import {PollingCentersWidget} from '@/app/_widgets/polling-centers-widget'
const PollingCentersPage: NextPage = () =>
{
  return (
    <Container className='space-y-6'>
      <PollingCentersWidget />
    </Container>
  )
};

export default PollingCentersPage;