import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import { itemsApi } from "../api/items";
import { usersApi } from "../api/users";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      itemsApi.middleware,
      usersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
