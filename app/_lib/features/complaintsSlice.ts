import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store';

interface Message
{
  title: string;
  image: string;
  description: string;
  sender: string;
  date: string;
}

interface ComplaintsState
{
	isEmpty: boolean;
  message: Message;
}

const initialState: ComplaintsState = {
	isEmpty: true,
  message: {
    title: '',
    image: '',
    description: '',
    sender: '',
    date: ''
  }
};

export const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message.image = action.payload.image;
      state.message.description = action.payload.description;
      state.message.sender = action.payload.sender;
		  state.message.date = action.payload.date;
		  state.isEmpty = false
    }
  }
});

export const selectCurrentMessage = (state: RootState) =>
	state.complaints.message;
export const selectMessageStatus = (state: RootState) => state.complaints.isEmpty
export const { setMessage } = complaintsSlice.actions;
export default complaintsSlice.reducer;
