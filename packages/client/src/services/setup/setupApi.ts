import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../lib/api';

export type SetupRequest = {
  completed: boolean;
};

export const setupApi = createApi({
  reducerPath: 'setupApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Check'],
  endpoints: (builder) => ({
    configureSetup: builder.mutation({
      query: (data: SetupRequest) => ({
        url: 'setup',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Check'],
    }),
    checkSetup: builder.query({
      query: () => ({
        url: 'setup/check',
        method: 'get',
      }),
      providesTags: ['Check'],
    }),
  }),
});

export const { useConfigureSetupMutation, useCheckSetupQuery } = setupApi;
