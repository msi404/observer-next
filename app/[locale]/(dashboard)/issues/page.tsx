import { type NextPage } from 'next'
import {Container} from '@/app/_components/container'
import { ComplaintsWidget } from '@/app/_widgets/complaints-widget'

const IssuesPage: NextPage = () =>
	{
		return (
			<Container>
				<ComplaintsWidget />
			</Container>
		)
};	
export default IssuesPage;