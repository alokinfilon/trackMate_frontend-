import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Auth0Provider } from 'react-native-auth0';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { AnimatedSplashScreen, ModalProvider } from './src/components';

import { ThemeProvider, AuthProvider, LanguageProvider, NotificationProvider } from './src/context';
import { RootNavigator } from './src/navigation';
import { fcmService } from './src/services';

// ── Deep-link navigator helper ───────────────────────────────────────────────
function getNavTargetFromNotification(remoteMessage) {
  const type = remoteMessage?.data?.type;
  switch (type) {
    case 'trip_share':
      return { screen: 'MainTab', params: { screen: 'HomeTab' } };
    case 'photo_upload':
    case 'collection_share':
      return { screen: 'MainTab', params: { screen: 'ImageUpload' } };
    case 'reminder':
      return { screen: 'MainTab', params: { screen: 'HomeTab' } };
    default:
      return { screen: 'Notifications' };
  }
}

// ── AppContent (Sub-component to access Redux store) ─────────────────────────
function AppContent({ navigationRef }) {
  const [showSplashAnimation, setShowSplashAnimation] = useState(true);
  const authLoading = useSelector((state) => state.auth.isLoading);

  if (showSplashAnimation) {
    return (
      <AnimatedSplashScreen
        isReady={!authLoading}
        onFinish={() => setShowSplashAnimation(false)}
      />
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const navigationRef = useRef(null);

  // Handle notification tap when app was in BACKGROUND
  useEffect(() => {
    const unsub = fcmService.onNotificationOpenedApp(remoteMessage => {
      const target = getNavTargetFromNotification(remoteMessage);
      if (navigationRef.current) {
        navigationRef.current.navigate(target.screen, target.params);
      }
    });
    return () => unsub();
  }, []);

  // Handle notification tap when app was QUIT (opened cold)
  useEffect(() => {
    fcmService.getInitialNotification().then(remoteMessage => {
      if (remoteMessage && navigationRef.current) {
        const target = getNavTargetFromNotification(remoteMessage);
        // Small delay to let navigation fully mount
        setTimeout(() => {
          navigationRef.current?.navigate(target.screen, target.params);
        }, 500);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <Auth0Provider
            domain="dev-ccfir3u2hdg8btjk.us.auth0.com"
            clientId="iQdvaJuzGtQr0KXxLB8zIGmxPCHD8sIk"
            customScheme="com.trackmate.auth0"
          >
            <AuthProvider>
              <LanguageProvider>
                <NotificationProvider>
                  <ModalProvider>
                    <AppContent navigationRef={navigationRef} />
                  </ModalProvider>
                </NotificationProvider>
              </LanguageProvider>
            </AuthProvider>
          </Auth0Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
