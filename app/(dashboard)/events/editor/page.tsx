'use client';
import {type NextPage} from 'next'
import {Container} from '@/app/_components/containers/container'
import { Editor } from '@/app/_components/custom/editor'
import { Toolbar } from '@/app/_components/custom/toolbar'
import {BackButton} from '@/app/_components/ui/back-button'
const EditorPage: NextPage = () =>
{
	return (
		<Container>
          <div className='flex print:hidden mb-4 items-center gap-4'>
          <BackButton backLink='/events'/>
          <h1>الفعاليات</h1>
        </div>
			<Toolbar />
			<Editor />
		</Container>
	)
};
export default EditorPage