import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { flightsApi } from "./services/flights";
import authSlice from "./authSlice";
import { authApi } from "./services/auth";
import { officesApi } from "./services/office";
import { scheduleApi } from "./services/schedules";
import { summaryApi } from "./services/summary";
import { amenitiesApi } from "./services/amenities";

console.log(authApi.reducerPath);

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [flightsApi.reducerPath]: flightsApi.reducer,
      [scheduleApi.reducerPath]: scheduleApi.reducer,
      [officesApi.reducerPath]: officesApi.reducer,
      [summaryApi.reducerPath]: summaryApi.reducer,
      [amenitiesApi.reducerPath]: amenitiesApi.reducer,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        flightsApi.middleware,
        officesApi.middleware,
        scheduleApi.middleware,
        summaryApi.middleware,
        amenitiesApi.middleware
      ),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
