// Store Slices Barrel — reducers, actions, thunks & selectors

// Auth
export { default as authReducer } from './authSlice';
export {
  initAuth,
  completeOnboarding,
  setAuthenticated,
  setLogout,
  selectIsAuthenticated,
  selectHasCompletedOnboarding,
  selectAuthLoading,
} from './authSlice';

// Profile
export { default as profileReducer } from './profileSlice';
export {
  fetchProfile,
  clearProfile,
  setProfileImage,
  selectProfile,
  selectProfileLoading,
  selectUserImage,
  selectProfileError,
} from './profileSlice';

// Trips
export { default as tripsReducer } from './tripsSlice';
export {
  fetchTrips,
  silentRefreshTrips,
  updateTripStatus,
  clearTrips,
  optimisticStatusUpdate,
  setRefreshing,
  selectTrips,
  selectTripsLoading,
  selectTripsRefreshing,
  selectTripsError,
  selectActionLoadingId,
} from './tripsSlice';
