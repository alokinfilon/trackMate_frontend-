import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context';
import { createStyles } from './onboarding.styles';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store/slices';

// Onboarding slides definition
const SLIDES = [
  {
    id: '1',
    title: 'Explore new places',
    subtitle: 'Find unique destinations',
    image: require('../../../assets/onboarding/explore.png'),
  },
  {
    id: '2',
    title: 'Track your booking',
    subtitle: 'Real-time updates',
    image: require('../../../assets/onboarding/track.png'),
  },
  {
    id: '3',
    title: 'Manage your trip',
    subtitle: 'All details in one place',
    image: require('../../../assets/onboarding/manage.png'),
  },
];

export default function OnboardingScreen() {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const dispatch = useAppDispatch();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleSkipOrFinish = () => {
    dispatch(completeOnboarding());
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  const isLastPage = currentIndex === SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.screenContainer} edges={['top', 'bottom']}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? colors.bg : '#FFFFFF'}
      />
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        bounces={false}
      />
      <View style={styles.bottomContainer}>
        {/* Indicators */}
        <View style={styles.indicatorRow}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={isLastPage ? handleSkipOrFinish : handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {isLastPage ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>

          {!isLastPage && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkipOrFinish}
              activeOpacity={0.6}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
