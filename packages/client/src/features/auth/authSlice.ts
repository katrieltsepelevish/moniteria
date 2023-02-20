import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface UserState {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  loading: boolean;
  user: UserState | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = Boolean(action.payload);
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, setLoading } = authSlice.actions;
