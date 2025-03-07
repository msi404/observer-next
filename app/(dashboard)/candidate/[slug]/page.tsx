import { type NextPage } from 'next'
import {Container} from '@/app/_components/containers/container'
import {ProfileWidget} from '@/app/_widgets/profile-widget'
const CandidatePage: NextPage = () =>
{
	return (
		<Container>
			<ProfileWidget />
		</Container>
	)
};

export default CandidatePage