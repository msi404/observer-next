/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {type FC} from 'react'
import { useDispatch } from 'react-redux'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { FontFamily } from '@tiptap/extension-font-family'
import {TextStyle} from '@tiptap/extension-text-style'
import { TextAlign } from '@tiptap/extension-text-align'
import {Underline} from '@tiptap/extension-underline'
import {setEditor, setContent} from '@/app/_lib/features/editorSlice'

export const SingleEditor: FC<{content: any}> = ({content}) =>
{
	const dispatch = useDispatch()
	const editor = useEditor( {
		content,
		onCreate ( {editor} )
		{
			dispatch( setEditor( editor ) )
			dispatch(setContent(content))
		},
		onDestroy ()
		{
			dispatch(setEditor(null))
		},
		onUpdate ( {editor} )
		{
			dispatch( setEditor( editor ) )
			dispatch(setContent(editor?.getHTML()))
		},
		onSelectionUpdate ( {editor} )
		{
			dispatch(setEditor(editor))
		},
		onTransaction ( {editor} )
		{
			dispatch(setEditor(editor))
		},
		onFocus ( {editor} )
		{
			dispatch(setEditor(editor))
		},
		onBlur ( {editor} )
		{
			dispatch(setEditor(editor))
		},
		onContentError ( {editor} )
		{
			dispatch(setEditor(editor))
		},
		extensions: [ StarterKit, Underline, FontFamily, TextStyle, Placeholder.configure( {
			placeholder: 'اكتب شيء...'
		} ),
			TextAlign.configure( {
			types: ['heading', 'paragraph']
		}) ],
		editorProps: {
			attributes: {
				style: "padding-left: 56px; padding-right: 56px;",
				class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 mx-auto focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-w-[1054px] min-h-[816px] pt-10 pr-14 pb-10 cursor-text'
			}
		}
	} )
	return (
		<div className='size-full overflow-x-auto bg-[#F9F8FD] px-4 print:p-0 print:bg-white print:overflow-visible'>
			<div className='min-w-max flex justify-center w-[816px] py-4 print:px-0 mx-auto print:w-full print:min-w-0'>
			<EditorContent editor={editor}/>
			</div>
		</div>
	)
}