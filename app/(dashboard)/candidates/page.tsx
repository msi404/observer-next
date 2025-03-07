'use client';
import { type NextPage } from 'next';

import { Container } from '@/app/_components/containers/container';
import {CandidatesWidget} from '@/app/_widgets/candidates-widget'

const CandidatesPage: NextPage = () => {
  return (
    <Container>
          <div>
           <CandidatesWidget />
          </div>
    </Container>
  );
};

export default CandidatesPage;
