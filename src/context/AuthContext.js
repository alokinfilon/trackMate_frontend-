import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import SplashScreen from 'react-native-splash-screen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    authService.setLogoutCallback(() => {
      setUserIsAuthenticated(false);
    });

    const initializeAuthStatus = async () => {
      try {
        const token = await authService.getAccessToken();

        if (token) {
          setUserIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Storage lookup initialization failed:", error);
      } finally {
        setAppIsLoading(false);
        try {
          SplashScreen.hide();
        } catch (e) {
          console.log("Splashscreen not linked or hidden manually.");
        }
      }
    };

    initializeAuthStatus();
  }, []);

  if (appIsLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#08b8f3" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ userIsAuthenticated, setUserIsAuthenticated }}>
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
