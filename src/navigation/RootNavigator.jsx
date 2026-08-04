import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { AuthContext, useTheme } from '../context';
import { selectHasCompletedOnboarding } from '../store/slices';
import MainTabNavigator from './MainTabNavigator';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  PlaceDetails as PlaceDetail,
  LoginScreen as login,
  SignUpScreen as signup,
  PersonalInfoScreen,
  AccountSecurityScreen,
  NotificationScreen,
  AppearanceScreen,
  LanguageScreen,
  TravelPreferenceScreen,
  BillingSubscriptionScreen,
  PaymentMethodsScreen,
  HelpSupportScreen,
  RateUsScreen,
  PrivacyTermsScreen,
  FaqScreen,
  ChangePasswordScreen,
  NotificationsScreen,
  DashboardDetails,
  OnboardingScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const SafePlaceDetail = (props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]} edges={['top']}>
      <PlaceDetail {...props} />
    </SafeAreaView>
  );
};

export default function RootNavigator() {
  const { userIsAuthenticated } = useContext(AuthContext);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : userIsAuthenticated ? (
        <>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="PlaceDetail" component={SafePlaceDetail} />
          <Stack.Screen name="DashboardDetails" component={DashboardDetails} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Appearance" component={AppearanceScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="TravelPreference" component={TravelPreferenceScreen} />
          <Stack.Screen name="BillingSubscription" component={BillingSubscriptionScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen name="RateUs" component={RateUsScreen} />
          <Stack.Screen name="PrivacyTerms" component={PrivacyTermsScreen} />
          <Stack.Screen name="Faq" component={FaqScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
