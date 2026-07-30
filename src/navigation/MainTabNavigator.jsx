import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { createNavigationStyles } from './navigation.styles';
import {GradientText,
   HomeIcon, 
   CommunityIcon , 
   CartIcon, 
   MoreIcon
   } from '../components/index';


   import {
    Home, 
    SettingsScreen,
    ImageUploadPage,
    Dashboard
  } from '../screens/index'


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
        else if (route.name === 'Dashboard') IconComp = CartIcon;
        else if (route.name === 'setting') IconComp = MoreIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, mergeOriginalArgs: true });
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
                      <Stop offset="1.05%" stopColor="#08b8f3" />
                      <Stop offset="32.02%" stopColor="#3ae3f6" />
                      <Stop offset="56.43%" stopColor="#06a8a6" />
                      <Stop offset="98.66%" stopColor="#31c8f1" />
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
                color={isActive ? colors.primary : colors.textSecondary}
              />
            )}

            {isActive ? (
              <GradientText
                text={label}
                style={[styles.bottomItemLabel, styles.activeBottomItemLabel]}
                numberOfLines={1}
              />
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
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="ImageUpload" component={ImageUploadPageWrapper} options={{ tabBarLabel: 'Memory' }} />
      <Tab.Screen name="setting" component={SettingsScreen} options={{ tabBarLabel: 'Setting' }} />
    </Tab.Navigator>
  );
}
