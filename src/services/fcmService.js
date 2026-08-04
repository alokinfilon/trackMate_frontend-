import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  setBackgroundMessageHandler,
  getInitialNotification,
  onNotificationOpenedApp,
  AuthorizationStatus
} from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import apiClient from './apiClient';

function safeGetMessaging() {
  if (typeof getMessaging !== 'function') {
    return null;
  }
  try {
    return getMessaging();
  } catch (err) {
    return null;
  }
}

let _onMessageCallback = null;

export const fcmService = {
  /**
   * Request notification permission (Android 13+ / iOS).
   * Returns true if granted.
   */
  async requestPermission() {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // Android < 13 doesn't need runtime permission
    }

    // iOS
    const msg = safeGetMessaging();
    if (!msg) return false;
    try {
      const authStatus = await requestPermission(msg);
      return (
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL
      );
    } catch {
      return false;
    }
  },

  /**
   * Get the FCM device token and optionally save it to the backend.
   */
  async getToken() {
    const msg = safeGetMessaging();
    if (!msg) {
      console.warn('[FCM DEBUG] getMessaging() returned null in getToken');
      return null;
    }
    try {
      const token = await getToken(msg);
      console.log('[FCM DEBUG] getToken() returned:', typeof token, token);
      return token;
    } catch (err) {
      console.warn('[FCM DEBUG] Failed to get token inside getToken:', err.message);
      return null;
    }
  },

  /**
   * Upload FCM token to backend so the server can send targeted pushes.
   * Gracefully silences errors — the rest of the app still works.
   */
  async saveTokenToBackend(fcmToken) {
    if (!fcmToken) return;
    try {
      await apiClient('/api/notifications/device-tokens', {
        method: 'POST',
        body: JSON.stringify({
          token: fcmToken,
          platform: Platform.OS,
        }),
      });
    } catch (err) {
      // Not fatal — app still receives FCM messages via Firebase directly
      console.warn('[FCM] Could not save token to backend:', err.message);
    }
  },

  /**
   * Subscribe a callback to receive foreground messages.
   * Called by NotificationContext on mount.
   */
  onForegroundMessage(callback) {
    _onMessageCallback = callback;
    const msg = safeGetMessaging();
    if (!msg) return () => { };
    try {
      const unsubscribe = onMessage(msg, async remoteMessage => {
        if (_onMessageCallback) {
          _onMessageCallback(remoteMessage);
        }
      });
      return unsubscribe; // caller must invoke this to unsubscribe
    } catch {
      return () => { };
    }
  },

  /**
   * Register a background/quit-state message handler.
   * Must be called outside React (in index.js or top-level).
   */
  setBackgroundHandler() {
    const msg = safeGetMessaging();
    if (!msg) {
      console.warn('[FCM] Native Firebase messaging module not available. Background handler not registered.');
      return;
    }
    try {
      setBackgroundMessageHandler(msg, async remoteMessage => {
        console.log('[FCM] Background message received:', remoteMessage.messageId);
      });
    } catch (e) {
      console.error('[FCM] Error in setBackgroundHandler:', e.message);
    }
  },

  /**
   * Get the notification that opened the app from QUIT state.
   * Returns null if app was opened normally.
   */
  async getInitialNotification() {
    const msg = safeGetMessaging();
    if (!msg) return null;
    try {
      return await getInitialNotification(msg);
    } catch {
      return null;
    }
  },


  onNotificationOpenedApp(callback) {
    const msg = safeGetMessaging();
    if (!msg) return () => { };
    try {
      return onNotificationOpenedApp(msg, callback);
    } catch {
      return () => { };
    }
  },


  async init() {
    const granted = await this.requestPermission();
    if (!granted) {
      console.log('[FCM] Notification permission denied.');
      return null;
    }
    const token = await this.getToken();
    await this.saveTokenToBackend(token);
    console.log('[FCM] Initialized. Token:', token?.slice(0, 20) + '...');
    return token;
  },
};

export default fcmService;
