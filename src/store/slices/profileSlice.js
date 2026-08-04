import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services';

// Fetch user profile from server
export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { getState, rejectWithValue }) => {
    // Skip if already loaded and fresh (within 5 minutes)
    const { lastFetched } = getState().profile;
    if (lastFetched && Date.now() - lastFetched < 5 * 60 * 1000) {
      return null; // Signal to skip the update
    }
    try {
      const res = await apiClient('/auth/profile');
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
      return rejectWithValue('Profile fetch failed');
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearProfile(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
    // Optimistic update for profile image after upload
    setProfileImage(state, action) {
      if (state.data) {
        state.data.user_image = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // null payload means cache was fresh, skip update
          state.data = action.payload;
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, setProfileImage } = profileSlice.actions;

// Selectors
export const selectProfile = (state) => state.profile.data;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectUserImage = (state) => state.profile.data?.user_image || null;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
