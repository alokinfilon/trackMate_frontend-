import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ModalProvider } from './src/components/modal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Auth0Provider } from 'react-native-auth0';

import { Tokens } from './src/theme/theme';
import GradientText from './src/components/gradientText';
import authService from './src/services/authService';

import signup from './src/screens/signup/index';
import home from './src/screens/home/index';
import PlaceDetail from './src/screens/place-detail';
//import ProductDisplayPage from './src/screens/placedetail';
import login from './src/screens/login/index';
//import LoginScreen from './src/screens/login/index';
import explore from "./src/screens/explore/index"
import feed from './src/screens/feed/index'
import profile from './src/screens/profile/index'

import HomeIcon from './src/components/svg/homeIcon';
import exploreIcon from './src/components/svg/exploreIcon';
import CommunityIcon from './src/components/svg/communityIcon';
import CartIcon from './src/components/svg/cartIcon';
import MoreIcon from './src/components/svg/moreIcon';
import ShoppingCartIcon from './src/components/svg/shoppingCartIcon';
import { getTokens } from './src/utils/storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = createContext();

const PlaceholderScreen = ({ title }) => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <View style={styles.placeholderWrapper}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  </SafeAreaView>
);

//const ExploreScreen = () => <PlaceholderScreen title="Explore" />;

const SafeHome = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <home {...props} />
  </SafeAreaView>
);

const SafeFeed = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <feed {...props} />
  </SafeAreaView>
);

const SafeProfile = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <profile {...props} />
  </SafeAreaView>
);

const SafeExplore = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <explore {...props} />
  </SafeAreaView>
);

const SafePlaceDetail = (props) => (
  <SafeAreaView style={{ flex: 1 }} edges={['top']}>
    <PlaceDetail {...props} />
  </SafeAreaView>
);
const SafeLogin = () => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <login />
  </SafeAreaView>
);

const SafeSignup = () => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <signup />
  </SafeAreaView>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomNavigation}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isActive = state.index === index;

        let IconComp;
        if (route.name === 'Home') IconComp = HomeIcon;
        else if (route.name === 'Explore') IconComp = exploreIcon;
        else if (route.name === 'Community') IconComp = CommunityIcon;
        else if (route.name === 'Cart') IconComp = CartIcon;
        else if (route.name === 'CartScreen') IconComp = ShoppingCartIcon;
        else if (route.name === 'More') IconComp = MoreIcon;

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
                      <Stop offset="1.05%" stopColor="#FBB59E" />
                      <Stop offset="32.02%" stopColor="#F8876C" />
                      <Stop offset="56.43%" stopColor="#F16646" />
                      <Stop offset="98.66%" stopColor="#F98F7A" />
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
                color={isActive ? '#ffffff' : '#b8b8b8'}
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

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={home} options={{ tabBarLabel: 'Home' }} />



    </Tab.Navigator>
  );
}
export default function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuthStatus = async () => {
      try {
        const token = await authService.getAccessToken();

        if (token) {
          setUserIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Storage lookup initialization failed:", error);
      } finally {
        setAppIsLoading(false);
        try {
          SplashScreen.hide();
        } catch (e) {
          console.log("Splashscreen not linked or hidden manually.");
        }
      }
    };

    initializeAuthStatus();
  }, []);
  if (appIsLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Auth0Provider
        domain="dev-ccfir3u2hdg8btjk.us.auth0.com"
        clientId="iQdvaJuzGtQr0KXxLB8zIGmxPCHD8sIk"
        customScheme="com.trackmate.auth0"
      >
        <AuthContext.Provider value={{ userIsAuthenticated, setUserIsAuthenticated }}>
          <ModalProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userIsAuthenticated ? (
                  <>
                    <Stack.Screen name="MainTab" component={TabNavigator} />
                    <Stack.Screen name="PlaceDetail" component={SafePlaceDetail} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={login} />
                    <Stack.Screen name="Signup" component={signup} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ModalProvider>
        </AuthContext.Provider>
      </Auth0Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#121212',
  },
  bottomNavigation: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 5,
    backgroundColor: '#151515',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#242424',
    position: 'relative',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
    position: 'relative',
  },
  topLineContainer: {
    position: 'absolute',
    top: -9,
    left: 0,
    right: 0,
    height: 3,
    alignItems: "center",
  },
  placeholderWrapper: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  bottomItemLabel: {
    color: '#b8b8b8',
    fontSize: 11.5,
    fontFamily: Tokens.typography.families.light,
    textAlign: 'center',
  },
  activeBottomItemLabel: {
    fontSize: Tokens.typography.sizes.body,
    fontFamily: Tokens.typography.families.light,
  }
});


