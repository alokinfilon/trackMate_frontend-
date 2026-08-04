import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import tripsReducer from './slices/tripsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    trips: tripsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableStateInvariant: false,
    }),
});

export default store;

// Re-export hooks for convenience
export { useAppDispatch, useAppSelector } from './hooks';
