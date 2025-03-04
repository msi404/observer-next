'use client';
import { type NextPage } from 'next'
import { usePathname } from 'next/navigation';
import {usePostQuery} from '@/app/_services/fetchApi'
import {Container} from '@/app/_components/container'
import { SingleEditor } from '@/app/_components/single-editor'
import { Toolbar } from '@/app/_components/toolbar'
import { BackButton } from '@/app/_components/ui/back-button'
 
const EditEventPage: NextPage = () =>
{
	const pathname = usePathname();
	const id = pathname.split( '/' ).reverse().at( 1 );
	const {data} = usePostQuery(id)
	return (
		<Container>
			 <div className='flex print:hidden mb-4 items-center gap-4'>
			 <BackButton backLink='/events'/>
			 <h1>رجوع</h1>
		  </div>
			<Toolbar />
			<SingleEditor content={data.content} />
		</Container>
	)
};
export default EditEventPage