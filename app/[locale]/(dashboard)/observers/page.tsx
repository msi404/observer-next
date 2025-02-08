'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/container';
import {ObserversWidget} from '@/app/_widgets/observers-widget'

const ObserversPage: NextPage = () => {
  return (
    <Container>
          <div>
            <ObserversWidget />
          </div>
    </Container>
  );
};

export default ObserversPage;
