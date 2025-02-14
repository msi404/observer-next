'use client';
import { type NextPage } from 'next';
import {Container} from '@/app/_components/container'
import { GovCentersWidget } from '@/app/_widgets/gov-centers-widget'

const PollingMangementPage: NextPage = () =>
{
  return (
    <Container className='space-y-6'>
      <GovCentersWidget />
    </Container>
  )
};

export default PollingMangementPage;