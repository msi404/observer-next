import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '@/app/_lib/store'

interface PaginationState
{
	totalPages: number
	currentPage: number 
	pageSize: number
}

const initialState: PaginationState = {
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
		},
		resetPaginationState: ( state) =>
		{
			state.currentPage = 1
		}
	}
} );

export const selectCurrentPage = ( state: RootState ) => state.pagination.currentPage
export const selectTotalPages = ( state: RootState ) => state.pagination.totalPages
export const selectPageSize = ( state: RootState ) => state.pagination.pageSize
export const {setTotalPages, setCurrentPage, resetPaginationState} = paginationSlice.actions
export default paginationSlice.reducer