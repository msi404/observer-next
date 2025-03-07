import { type NextPage } from 'next'
import {Container} from '@/app/_components/containers/container'
import {NotificationsWidget} from '@/app/_widgets/notifications-widget'
const NotificationsPage: NextPage = () =>
	{
		return (
			<Container>
				<NotificationsWidget />
			</Container>
		)
};	
export default NotificationsPage;