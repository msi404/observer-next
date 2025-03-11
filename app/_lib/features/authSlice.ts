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

let initialState: User = userState;

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    initialState = JSON.parse(storedUser);
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      {
        if (typeof window !== 'undefined') {
          const user = JSON.parse(localStorage.getItem( 'user' )!);
          Object.assign( user,  payload )
          localStorage.setItem('user', JSON.stringify(user))
        }
        Object.assign(state, payload);
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      Object.assign(state, userState); 
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      ( state, { payload } ) =>
      {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(payload.data));
        }
        Object.assign(state, payload.data);
      }
    );
  }
});

export const selectToken = ( state: RootState ) => state.auth.token;
export const selectUser = ( state: RootState ) => state.auth;
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;