import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken, refreshToken, userId) => {
  try {
    const sessionData = JSON.stringify({ accessToken, refreshToken, userId });
    await Keychain.setGenericPassword('user_session', sessionData, {
      service: 'com.trackmate',
    });
  } catch (error) {
    console.error("Failed to secure credentials in hardware vault:", error);
  }
};

export const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'com.trackmate' });
    return credentials ? JSON.parse(credentials.password) : null;
  } catch (error) {
    return null;
  }
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword({ service: 'com.trackmate' });
};
