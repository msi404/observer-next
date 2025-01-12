import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store'
import {type Editor} from '@tiptap/react'

interface EditorState
{
	editor: Editor | null
}

const initialState: EditorState = {
	editor: null
};

export const editorSlice = createSlice( {
	name: 'editor',
	initialState,
	reducers: {
		setEditor: ( state, action ) =>
		{
			state.editor = action.payload
		}
	}
} );

export const selectEditor = ( state: RootState ) => state.editor.editor
export const {setEditor} = editorSlice.actions
export default editorSlice.reducer