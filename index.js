/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fcmService } from './src/services';

// ── FCM background handler (must be registered outside React) ─────────────
fcmService.setBackgroundHandler();

export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Main);
