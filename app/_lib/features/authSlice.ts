import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store';
import { authApi } from '@/app/_services/authApi'
import { type User } from '@/app/_auth/auth-rbac'

const userState: User = {
	userName: null,
	fullName: null,
	role: null,
	token: null
}

let user;

if (typeof window !== 'undefined') {
	user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || JSON.stringify(userState)) : JSON.stringify(userState);
 }
	
const initialState: User = {
	userName: user?.userName,
	fullName: user?.fullName,
	role: user?.role,
	token: user?.token
};

export const authSlice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) =>
		{
			localStorage && localStorage.removeItem( 'userData' )
			state.fullName = null
			state.userName = null
			state.role = null
			state.token = null
		},
	},
	extraReducers: ( builder ) =>
	{
		builder.addMatcher( authApi.endpoints.login.matchFulfilled, ( _state, { payload } ) =>
		{
			localStorage && localStorage?.setItem( "user", JSON.stringify( payload.result ) );
			return payload
		} )
	}
} );

export const selectToken = ( state: RootState ) => state.auth.token
export const selectUser = (state: RootState) => state.auth
export const {logout} = authSlice.actions
export default authSlice.reducer