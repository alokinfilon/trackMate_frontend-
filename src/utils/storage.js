import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (accessToken, refreshToken, userId) => {
  try {
    const sessionData = JSON.stringify({ accessToken, refreshToken, userId });
    await AsyncStorage.setItem('user_session', sessionData);
  } catch (error) {
    console.error("Failed to secure credentials in storage:", error);
  }
};

export const getTokens = async () => {
  try {
    const sessionData = await AsyncStorage.getItem('user_session');
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('user_session');
  } catch (error) {
    console.error("Failed to clear credentials from storage:", error);
  }
};
