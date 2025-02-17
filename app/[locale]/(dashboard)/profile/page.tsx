import {type NextPage} from 'next'
import { Container } from '@/app/_components/container'
import {CurrentProfileWidget} from '@/app/_widgets/current-profile-widget'
const ProfilePage: NextPage = () =>
{
	return (
		<Container>
			<CurrentProfileWidget />
		</Container>
	)
};
export default ProfilePage