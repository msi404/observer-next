'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/container';
import {PartiesRepresentersWidget} from '@/app/_widgets/parties-representers-widget'

const PartiesRepresentersPage: NextPage = () => {
  return (
    <Container>
          <div>
           <PartiesRepresentersWidget />
          </div>
    </Container>
  );
};

export default PartiesRepresentersPage;