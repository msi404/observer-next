'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/container';
import {DataEntriesWidget} from '@/app/_widgets/data-entries-widget'
const EventsPage: NextPage = () => {
  return (
    <Container>
          <div>
            <DataEntriesWidget />
          </div>
    </Container>
  );
};

export default EventsPage;
