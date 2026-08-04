import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../context';
import { Tokens } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - Tokens.layout.paddingHorizontal * 2;
const BANNER_HEIGHT = BANNER_WIDTH * 0.38;

const BANNERS = [
  { id: '1', image: require('./images/promo_banner_1.png') },
  { id: '2', image: require('./images/promo_banner_2.png') },
  { id: '3', image: require('./images/promo_banner_3.png') },
];

const PromoCarousel = () => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % BANNERS.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
    // Only update if it actually changes to prevent loop triggers
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        onScrollToIndexFailed={() => {}}
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
          </View>
        )}
      />
      {/* Dot indicators */}
      <View style={styles.dotsRow}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === activeIndex ? '#FF6B35' : colors.textTertiary,
                width: i === activeIndex ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Tokens.layout.paddingHorizontal,
    marginBottom: Tokens.gaps.large,
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Tokens.gaps.small,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default PromoCarousel;
