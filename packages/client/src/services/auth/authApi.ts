import { createApi } from '@reduxjs/toolkit/query/react';

import { setLoading, setUser } from '../../features/auth/authSlice';
import { axiosBaseQuery } from '../../lib/api';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Me'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: LoginRequest) => ({
        url: 'auth/login',
        method: 'post',
        data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));

        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data!.user));

          const refetchMe = authApi.endpoints.getMe.initiate(null, {
            forceRefetch: true,
          });
          await dispatch(refetchMe);
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    registerUser: builder.mutation({
      query: (data: RegisterRequest) => ({
        url: 'auth/register',
        method: 'post',
        data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));

        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data!.user));

          const refetchMe = authApi.endpoints.getMe.initiate(null, {
            forceRefetch: true,
          });
          await dispatch(refetchMe);
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: 'auth/me',
        method: 'get',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));

        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data!.user));
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ['Me'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'post',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));

        try {
          await queryFulfilled;
          dispatch(setUser(null));
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
      invalidatesTags: ['Me'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApi;
