import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import {tatweerApi} from '@/app/_services/api'
import authReducer from '@/app/_lib/features/auth/authSlice'

export const store = configureStore( {
	reducer: {
		[tatweerApi.reducerPath]: tatweerApi.reducer,
		auth: authReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tatweerApi.middleware)
} );

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch