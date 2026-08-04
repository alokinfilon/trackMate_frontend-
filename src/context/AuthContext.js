import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import {
  initAuth,
  setAuthenticated,
  setLogout,
  selectIsAuthenticated,
  selectAuthLoading,
  clearProfile,
  clearTrips,
} from '../store/slices';
import { authService } from '../services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    // Register logout callback to clear Redux state
    authService.setLogoutCallback(() => {
      dispatch(clearProfile());
      dispatch(clearTrips());
      dispatch(setLogout());
    });

    // Initialize auth from stored token
    dispatch(initAuth());
  }, [dispatch]);

  const setUserIsAuthenticated = (value) => {
    if (value) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(clearProfile());
      dispatch(clearTrips());
      dispatch(setLogout());
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#08b8f3" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ userIsAuthenticated: isAuthenticated, setUserIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
