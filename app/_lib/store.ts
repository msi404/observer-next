import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import {tatweerApi} from '@/app/_services/api'
import authReducer from '@/app/_lib/features/auth/authSlice'
import editorReducer from '@/app/_lib/features/editorSlice'
export const store = configureStore( {
	reducer: {
		[tatweerApi.reducerPath]: tatweerApi.reducer,
		auth: authReducer,
		editor: editorReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(tatweerApi.middleware)
} );

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch