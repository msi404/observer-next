import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store';
import { type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState
{
	token: string
}

const initialState: AuthState = {
	token: ''
};

export const authSlice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		login: ( state, action: PayloadAction<string>) =>
		{
			state.token = action.payload
		},
		logout: ( state ) =>
		{
			state.token = ''
		},
	},
	// extraReducers: ( builder ) =>
	// {
	// 	builder.addCase
	// }
} );

export const selectToken = (state: RootState) => state.auth.token
export const {login, logout} = authSlice.actions
export default authSlice.reducer