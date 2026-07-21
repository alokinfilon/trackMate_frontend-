import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Auth0Provider } from 'react-native-auth0';

// 👇 FIX: Direct file path call instead of calling from components/index
import { ModalProvider } from './src/components/modal'; 

import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Auth0Provider
          domain="dev-ccfir3u2hdg8btjk.us.auth0.com"
          clientId="iQdvaJuzGtQr0KXxLB8zIGmxPCHD8sIk"
          customScheme="com.trackmate.auth0"
        >
          <AuthProvider>
            <ModalProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </ModalProvider>
          </AuthProvider>
        </Auth0Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
