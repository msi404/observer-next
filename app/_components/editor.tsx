'use client'
import {useEffect, useState} from 'react'
import '@blocknote/core/fonts/inter.css';
import "@blocknote/shadcn/style.css";
import { BlockNoteView } from '@blocknote/shadcn';
import { useCreateBlockNote, FormattingToolbar } from '@blocknote/react';

export const Editor = () =>
{
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [markdown, setMarkdown] = useState<string>('')
	const editor = useCreateBlockNote()
	useEffect( () =>
	{
		const convertToMarkdown = async () =>
		{
			const markdown = await editor.blocksToMarkdownLossy( editor.document )
			setMarkdown( markdown )
		}
		convertToMarkdown()
	}, [editor])
	return (
		<BlockNoteView
			slashMenu={false}
			sideMenu={false}
			formattingToolbar={false}
			editor={ editor }>
			<FormattingToolbar />
			</BlockNoteView>
	)
}