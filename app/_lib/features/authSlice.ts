import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '@/app/_lib/store';
import { authApi } from '@/app/_services/authApi';
import { type User } from '@/app/_auth/auth-rbac';

const userState: User = {
  id: null,
  phone: null,
  pollingCenter: null,
  profileImg: null,
  totalPosts: null,
  updatedAt: null,
  username: null,
  candidateListSerial: null,
  candidateSerial: null,
  coverImg: null,
  createdAt: null,
  dateOfBirth: null,
  deletedAt: null,
  electoralEntity: null,
  email: null,
  gov: null,
  role: null,
  name: null,
  token: null
};

let user;

if (typeof window !== 'undefined') {
  user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || JSON.stringify(userState))
    : JSON.stringify(userState);
}

const initialState: User = user

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage && localStorage.removeItem('user');
		state.id = null
		state.phone = null
		state.pollingCenter = null
		state.profileImg = null
		state.totalPosts = null
		state.updatedAt = null
		state.username = null
		state.candidateListSerial = null
		state.candidateSerial = null
		state.coverImg = null
		state.createdAt = null
		state.dateOfBirth = null
		state.deletedAt = null
		state.electoralEntity = null
		state.email = null
		state.gov = null
		state.role = 0
		state.name = null
		state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      ( _state, { payload } ) =>
      {
        localStorage &&
          localStorage?.setItem('user', JSON.stringify(payload.data));
        return payload;
      }
    );
  }
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;