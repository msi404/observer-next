'use client';
import { type NextPage } from 'next';
import {Container} from '@/app/_components/container'
import {ElectoralEntitiesWidget} from '@/app/_widgets/electoral-entities-widget'
const ElectoralEntitiesPage: NextPage = () =>
{
  return (
	 <Container className='space-y-6'>
		<ElectoralEntitiesWidget />
	 </Container>
  )
};

export default ElectoralEntitiesPage;