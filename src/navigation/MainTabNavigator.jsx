import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useNotifications } from '../context';
import { createNavigationStyles } from './navigation.styles';
import { useNavigation } from '@react-navigation/native';
import {
   HomeIcon, 
   CommunityIcon, 
   CalendarCheckIcon,
   SettingsIcon
   } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';


   import {
    Home, 
    SettingsScreen,
    ImageUploadPage,
    Dashboard
  } from '../screens'


const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createNavigationStyles(colors), [colors]);

  return (
    <View style={styles.bottomNavigation}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isActive = state.index === index;

        let IconComp;
        if (route.name === 'HomeTab') IconComp = HomeIcon;
        else if (route.name === 'ImageUpload') IconComp = CommunityIcon;
        else if (route.name === 'Dashboard') IconComp = CalendarCheckIcon;
        else if (route.name === 'setting') IconComp = SettingsIcon;

        const onPress = () => {
          console.log('[CustomTabBar] Tab pressed:', route.name, 'isActive:', isActive);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            console.log('[CustomTabBar] Navigating to:', route.name);
            navigation.navigate(route.name, route.params);
          } else {
            console.log('[CustomTabBar] Navigation skipped. isActive:', isActive, 'defaultPrevented:', event.defaultPrevented);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            activeOpacity={0.75}
            onPress={onPress}
            style={styles.bottomItem}
          >
            {isActive && (
              <View style={styles.topLineContainer}>
                <Svg height="2" width="60%">
                  <Defs>
                    <LinearGradient id="lineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                      <Stop offset="0%" stopColor="#FF8C00" />
                      <Stop offset="100%" stopColor="#FF6B35" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="100%" height="3" fill="url(#lineGrad)" />
                </Svg>
              </View>
            )}

            {IconComp && (
              <IconComp
                size={22}
                strokeWidth={1.8}
                focused={isActive}
                color={isActive ? '#FF6B35' : colors.textSecondary}
              />
            )}

            {isActive ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.bottomItemLabel,
                  styles.activeBottomItemLabel,
                  { color: '#FF6B35' }
                ]}
              >
                {label}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.bottomItemLabel}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ── Notification Bell ────────────────────────────────────────────────────────
function NotificationBell() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { unreadCount } = useNotifications();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notifications')}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={0.7}
    >
      <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
      {unreadCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: '#EF4444',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 3,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 10,
              fontFamily: 'Outfit-Bold',
              lineHeight: 12,
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const ImageUploadPageWrapper = (props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createNavigationStyles(colors), [colors]);
  return (
    <SafeAreaView style={[styles.safeAreaWrapper, { backgroundColor: colors.bg }]} edges={['top', 'left', 'right']}>
      <ImageUploadPage {...props} />
    </SafeAreaView>
  );
};

export default function MainTabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerRight: () => <View style={{ marginRight: 16 }}><NotificationBell /></View>,
        headerTitle: '',
        headerStyle: { backgroundColor: colors.bg, elevation: 0, shadowOpacity: 0 },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={Home} options={{ tabBarLabel: 'Home', headerShown: false }} />
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'My Booking', headerShown: false }} />
      <Tab.Screen name="ImageUpload" component={ImageUploadPageWrapper} options={{ tabBarLabel: 'Memory', headerShown: false }} />
      <Tab.Screen name="setting" component={SettingsScreen} options={{ tabBarLabel: 'Setting', headerShown: false }} />
    </Tab.Navigator>
  );
}
