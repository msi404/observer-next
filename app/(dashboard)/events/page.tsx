'use client';
import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container';
import {PostsWidget} from '@/app/_widgets/posts-widget'
const EventsPage: NextPage = () => {
  return (
    <Container>
          <div>
            <PostsWidget />
          </div>
    </Container>
  );
};

export default EventsPage;
