import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store'
import {type Editor} from '@tiptap/react'

interface EditorState
{
	editor: Editor | null
	content: string | null
}

const initialState: EditorState = {
	editor: null,
	content: null
};

export const editorSlice = createSlice( {
	name: 'editor',
	initialState,
	reducers: {
		setEditor: ( state, action ) =>
		{
			state.editor = action.payload
		},
		setContent: ( state, action ) =>
		{
			state.content = action.payload
		}
	}
} );

export const selectEditor = ( state: RootState ) => state.editor.editor
export const selectContent = ( state: RootState ) => state.editor.content
export const {setEditor, setContent} = editorSlice.actions
export default editorSlice.reducer