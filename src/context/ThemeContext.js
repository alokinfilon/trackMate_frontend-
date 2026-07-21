import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS, GRADIENTS, SHADOWS, RADIUS, SPACING, Tokens } from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('app_theme');
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (e) {
        console.error('Failed to load theme preference', e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (mode) => {
    try {
      setIsDarkMode(mode === 'dark');
      await AsyncStorage.setItem('app_theme', mode);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? DARK_COLORS : LIGHT_COLORS,
    gradients: GRADIENTS,
    shadows: SHADOWS,
    radius: RADIUS,
    spacing: SPACING,
    tokens: Tokens,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
