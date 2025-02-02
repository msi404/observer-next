import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '@/app/_lib/store'

interface EditorState
{
	totalPages: number
	currentPage: number 
	pageSize: number
}

const initialState: EditorState = {
	totalPages: 1,
	currentPage: 1,
	pageSize: 10
};

export const paginationSlice = createSlice( {
	name: 'pagination',
	initialState,
	reducers: {
		setTotalPages: ( state, action ) =>
		{
			state.totalPages = action.payload
		},
		setCurrentPage: ( state, action ) =>
		{
			state.currentPage = action.payload
		}
	}
} );

export const selectCurrentPage = ( state: RootState ) => state.pagination.currentPage
export const selectTotalPages = ( state: RootState ) => state.pagination.totalPages
export const selectPageSize = ( state: RootState ) => state.pagination.pageSize
export const {setTotalPages, setCurrentPage} = paginationSlice.actions
export default paginationSlice.reducer