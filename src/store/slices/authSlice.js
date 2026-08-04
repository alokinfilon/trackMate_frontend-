import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk to initialize auth status on app boot
export const initAuth = createAsyncThunk('auth/init', async () => {
  const token = await authService.getAccessToken();
  const onboarding = await AsyncStorage.getItem('has_completed_onboarding');
  return {
    isAuthenticated: !!token,
    hasCompletedOnboarding: onboarding === 'true',
  };
});

// Async thunk to complete onboarding flow
export const completeOnboarding = createAsyncThunk('auth/completeOnboarding', async () => {
  await AsyncStorage.setItem('has_completed_onboarding', 'true');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    isLoading: true,
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
    setLogout(state) {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.hasCompletedOnboarding = action.payload.hasCompletedOnboarding;
        state.isLoading = false;
        try { SplashScreen.hide(); } catch (e) { /* noop */ }
      })
      .addCase(initAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.hasCompletedOnboarding = false;
        state.isLoading = false;
        try { SplashScreen.hide(); } catch (e) { /* noop */ }
      })
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.hasCompletedOnboarding = true;
      });
  },
});

export const { setAuthenticated, setLogout } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectHasCompletedOnboarding = (state) => state.auth.hasCompletedOnboarding;
export const selectAuthLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
