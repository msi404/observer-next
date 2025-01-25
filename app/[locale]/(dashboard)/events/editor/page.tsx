'use client';
import {type NextPage} from 'next'
import {Container} from '@/app/_components/container'
import { Editor } from '@/app/_components/editor'
import { Toolbar } from '@/app/_components/toolbar'

const EditorPage: NextPage = () =>
{
	return (
		<Container>
			<Toolbar />
			<Editor />
		</Container>
	)
};

export default EditorPage