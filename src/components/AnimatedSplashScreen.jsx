import React, { useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Tokens } from '../theme/theme';

export default function AnimatedSplashScreen({ isReady, onFinish }) {
  // Start logo at full scale and opacity to match the static native splash exactly.
  // This prevents any visual jump or logo disappearing on transition.
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  // Track if the minimum visual animation duration is completed
  const animationDone = useRef(false);

  // Helper function to trigger transition
  const checkTransition = useCallback(() => {
    if (animationDone.current && isReady) {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) {
          onFinish();
        }
      });
    }
  }, [isReady, screenOpacity, onFinish]);

  useEffect(() => {
    // Hide the native static splash screen immediately so the animated RN splash is visible
    try {
      SplashScreen.hide();
    } catch (e) {
      console.log('Failed to hide native splash screen:', e);
    }

    // Run a subtle logo pulse (scale up slightly, then spring back) 
    // while sliding up and fading in the app name below it.
    Animated.parallel([
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.06,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 30,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Mark animation done after 1.5 seconds (representing the minimal splash screen visible time)
    const animTimer = setTimeout(() => {
      animationDone.current = true;
      checkTransition();
    }, 1500);

    return () => clearTimeout(animTimer);
  }, [logoScale, textTranslateY, textOpacity, checkTransition]);

  // Monitor readiness changes
  useEffect(() => {
    if (isReady) {
      checkTransition();
    }
  }, [isReady, checkTransition]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.centerWrapper}>
        {/* Animated App Logo */}
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
          resizeMode="contain"
        />

        {/* Animated App Name */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}
        >
          <Text style={styles.titleText}>trackMate</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logo: {
    width: 180,
    height: 180,
  },
  titleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.8,
  },
});
