import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../lib/api';

export type AddMonitorRequest = {
  name: string;
  uri: string;
  type: string;
  heartbeatInterval: number;
  retries: number;
};

export type UpdateMonitorRequest = {
  _id: string;
  name?: string;
  uri?: string;
  type?: string;
  heartbeatInterval?: number;
  retries?: number;
  active?: boolean;
};

export type MonitorState = {
  _id: string;
  name: string;
  uri: string;
  type: string;
  heartbeatInterval: number;
  retries: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const monitorApi = createApi({
  reducerPath: 'monitorApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['getAll'],
  endpoints: (builder) => ({
    addMonitor: builder.mutation({
      query: (data: AddMonitorRequest) => ({
        url: 'monitor',
        method: 'post',
        data,
      }),
      invalidatesTags: ['getAll'],
    }),
    updateMonitor: builder.mutation({
      query: (data: UpdateMonitorRequest) => ({
        url: 'monitor',
        method: 'patch',
        data,
      }),
      invalidatesTags: ['getAll'],
    }),
    getAllMonitors: builder.query({
      query: () => ({
        url: 'monitor',
        method: 'get',
      }),
      providesTags: ['getAll'],
    }),
    getMonitorById: builder.query({
      query: (id: string) => ({
        url: `monitor/${id}`,
        method: 'get',
      }),
    }),
    deleteMonitor: builder.mutation({
      query: (id: string) => ({
        url: 'monitor',
        method: 'delete',
        data: { _id: id },
      }),
      invalidatesTags: ['getAll'],
    }),
  }),
});

export const {
  useUpdateMonitorMutation,
  useAddMonitorMutation,
  useGetAllMonitorsQuery,
  useGetMonitorByIdQuery,
  useDeleteMonitorMutation,
} = monitorApi;
