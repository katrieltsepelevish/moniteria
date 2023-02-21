import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { authApi } from '../services/auth/authApi';
import { authSlice } from '../features/auth/authSlice';
import { setupApi } from '../services/setup/setupApi';
import { monitorApi } from '../services/monitor/monitorApi';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [setupApi.reducerPath]: setupApi.reducer,
    [monitorApi.reducerPath]: monitorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      setupApi.middleware,
      monitorApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
