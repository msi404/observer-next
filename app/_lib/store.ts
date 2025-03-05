import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tatweerApi } from '@/app/_services/api';
import authReducer from '@/app/_lib/features/authSlice';
import editorReducer from '@/app/_lib/features/editorSlice';
import paginationReucer from '@/app/_lib/features/paginationSlice'
import complaintsReducer from '@/app/_lib/features/complaintsSlice'
import notificationsReducer from '@/app/_lib/features/notificationsSlice'
import fullscreenReducer from '@/app/_lib/features/fullScreenSlice'
export const store = configureStore({
  reducer: {
    [tatweerApi.reducerPath]: tatweerApi.reducer,
    auth: authReducer,
    editor: editorReducer,
    pagination: paginationReucer,
    complaints: complaintsReducer,
    notifications: notificationsReducer,
    fullscreen: fullscreenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      tatweerApi.middleware
    )
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
