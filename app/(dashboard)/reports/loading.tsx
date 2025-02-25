import { Container } from '@/app/_components/container'
import {LoadingIndicator} from '@/app/_components/loading-indicator'
const Loading = () =>
{
	return (
		<Container className='flex justify-center items-center'>
			<LoadingIndicator />
		</Container>
	)
};

export default Loading;