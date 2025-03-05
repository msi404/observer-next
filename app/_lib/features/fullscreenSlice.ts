import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store'

interface State
{
	isFullscreen: boolean
}

const initialState: State = {
	isFullscreen: false
};

export const fullscreenSlice = createSlice( {
	name: 'fullscreen',
	initialState,
	reducers: {
		setFullScreen: ( state, action ) =>
		{
			state.isFullscreen = action.payload
		},
	}
} );

export const selectIsFullScreen = ( state: RootState ) => state.fullscreen.isFullscreen
export const {setFullScreen} = fullscreenSlice.actions
export default fullscreenSlice.reducer