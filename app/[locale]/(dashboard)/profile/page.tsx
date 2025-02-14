import {type NextPage} from 'next'
import { Container } from '@/app/_components/container'
import { ProfileWidget } from '@/app/_widgets/profile-widget'

const ProfilePage: NextPage = () =>
{
	return (
		<Container>
			<ProfileWidget />
		</Container>
	)
};
export default ProfilePage