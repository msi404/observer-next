import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store';

interface Notification
{
  title: string;
  image: string;
  description: string;
  sender: string;
  date: string;
}

interface NotificationsState
{
	isEmpty: boolean;
  notification: Notification;
}

const initialState: NotificationsState = {
	isEmpty: true,
  notification: {
    title: '',
    image: '',
    description: '',
    sender: '',
    date: ''
  }
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification.image = action.payload.image;
      state.notification.description = action.payload.description;
      state.notification.sender = action.payload.sender;
		  state.notification.date = action.payload.date;
		  state.isEmpty = false
    }
  }
});

export const selectCurrentNotification = (state: RootState) =>
	state.notifications.notification;
export const selectNotificationStatus = (state: RootState) => state.notifications.isEmpty
export const { setNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
