import { type NextPage } from 'next';
import { Container } from '@/app/_components/containers/container';
import { PostWidget } from '@/app/_widgets/post-widget';

const PostPage: NextPage = () =>
{
	return (
		<Container>
			<PostWidget />
		</Container>
	)
};

export default PostPage;