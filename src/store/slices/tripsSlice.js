import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService, httpService } from '../../services';

const doFetchTrips = async (rejectWithValue) => {
  const token = await authService.getAccessToken();
  if (!token) {
    return rejectWithValue('Session expired. Please log in again.');
  }

  const response = await httpService.trips.getTrips();

  const rawText = await response.text();
  if (rawText.trim().startsWith('<')) {
    return rejectWithValue('Server error page returned.');
  }

  const json = JSON.parse(rawText);
  if (json.success && json.data) {
    return json.data;
  }
  return rejectWithValue(json.message || 'Failed to load trips.');
};

// Full fetch — shows loading skeleton (first load)
export const fetchTrips = createAsyncThunk(
  'trips/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await doFetchTrips(rejectWithValue);
    } catch (err) {
      return rejectWithValue(err.message || 'Network connectivity failure.');
    }
  }
);

// Silent background refresh — does NOT set loading=true, no skeleton flicker
export const silentRefreshTrips = createAsyncThunk(
  'trips/silentRefresh',
  async (_, { rejectWithValue }) => {
    try {
      return await doFetchTrips(rejectWithValue);
    } catch (err) {
      return rejectWithValue(err.message || 'Network connectivity failure.');
    }
  }
);

// Update trip status with optimistic update
export const updateTripStatus = createAsyncThunk(
  'trips/updateStatus',
  async ({ tripId, newStatus }, { dispatch, rejectWithValue }) => {
    try {
      // Optimistic update immediately — UI responds instantly
      dispatch(optimisticStatusUpdate({ tripId, newStatus }));

      const token = await authService.getAccessToken();
      if (!token) {
        return rejectWithValue('Session expired.');
      }

      const response = await httpService.trips.updateTripStatus(tripId, newStatus);

      const rawText = await response.text();
      const json = JSON.parse(rawText);

      if (response.ok && (json.success || json.data)) {
        return { tripId, newStatus };
      }
      // Revert on failure
      return rejectWithValue(json.message || 'Could not update trip status.');
    } catch (err) {
      return rejectWithValue(err.message || 'Network failure during update.');
    }
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    items: [],
    loading: false,   // full skeleton load (first mount)
    refreshing: false, // pull-to-refresh spinner
    error: null,
    actionLoadingId: null,
  },
  reducers: {
    clearTrips(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    // Optimistic local update before server confirms
    optimisticStatusUpdate(state, action) {
      const { tripId, newStatus } = action.payload;
      state.items = state.items.map((trip) =>
        trip._id === tripId ? { ...trip, status: newStatus } : trip
      );
    },
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTrips — shows full skeleton loader
      .addCase(fetchTrips.pending, (state) => {
        // Only show loading if there are no cached items yet
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.items = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload;
      })
      // silentRefreshTrips — updates data in background without showing loader
      .addCase(silentRefreshTrips.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // silentRefreshTrips.pending and rejected — do nothing, keep current data
      // updateTripStatus
      .addCase(updateTripStatus.pending, (state, action) => {
        state.actionLoadingId = action.meta.arg.tripId;
      })
      .addCase(updateTripStatus.fulfilled, (state) => {
        state.actionLoadingId = null;
      })
      .addCase(updateTripStatus.rejected, (state, action) => {
        state.actionLoadingId = null;
        state.error = action.payload;
      });
  },
});

export const { clearTrips, optimisticStatusUpdate, setRefreshing } =
  tripsSlice.actions;

// Selectors
export const selectTrips = (state) => state.trips.items;
export const selectTripsLoading = (state) => state.trips.loading;
export const selectTripsRefreshing = (state) => state.trips.refreshing;
export const selectTripsError = (state) => state.trips.error;
export const selectActionLoadingId = (state) => state.trips.actionLoadingId;

export default tripsSlice.reducer;
