'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container'
import {StationsWidget} from '@/app/_widgets/stations-widget'
const StationsPage: NextPage = () =>
{
  return (
	 <Container className='space-y-6'>
		<StationsWidget />
	 </Container>
  )
};

export default StationsPage;