import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';
import MainTabNavigator from './MainTabNavigator';
import PlaceDetail from '../screens/place-detail';
import login from '../screens/login/index';
import signup from '../screens/signup/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { createNavigationStyles } from './navigation.styles';

const Stack = createNativeStackNavigator();

const SafePlaceDetail = (props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <PlaceDetail {...props} />
    </SafeAreaView>
  );
};

export default function RootNavigator() {
  const { userIsAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userIsAuthenticated ? (
        <>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="PlaceDetail" component={SafePlaceDetail} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Signup" component={signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
