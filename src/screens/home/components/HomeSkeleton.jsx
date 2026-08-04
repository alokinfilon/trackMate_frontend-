import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Skeleton } from '../../../components';
import { useTheme } from '../../../context';

const { width } = Dimensions.get('window');

export default function HomeSkeleton() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} showsVerticalScrollIndicator={false}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Skeleton width={44} height={44} borderRadius={22} />
          <View style={styles.headerTextWrapper}>
            <Skeleton width={100} height={14} borderRadius={4} />
            <Skeleton width={140} height={10} borderRadius={3} style={styles.marginTop6} />
          </View>
        </View>
        <Skeleton width={40} height={40} borderRadius={20} />
      </View>

      {/* Search Bar Skeleton */}
      <View style={styles.searchSection}>
        <Skeleton width="100%" height={50} borderRadius={25} />
      </View>

      {/* Promo Carousel Skeleton */}
      <View style={styles.carouselSection}>
        <Skeleton width="100%" height={160} borderRadius={16} />
      </View>

      {/* Categories Row Skeleton */}
      <View style={styles.categoriesRow}>
        <Skeleton width={75} height={36} borderRadius={18} style={styles.marginRight10} />
        <Skeleton width={90} height={36} borderRadius={18} style={styles.marginRight10} />
        <Skeleton width={80} height={36} borderRadius={18} style={styles.marginRight10} />
        <Skeleton width={95} height={36} borderRadius={18} />
      </View>

      {/* Popular Categories Title Skeleton */}
      <View style={styles.sectionHeader}>
        <Skeleton width={140} height={18} borderRadius={4} />
      </View>

      {/* Popular Category Card Skeletons */}
      <View style={styles.popularRow}>
        <Skeleton width={width * 0.43} height={90} borderRadius={16} />
        <Skeleton width={width * 0.43} height={90} borderRadius={16} />
      </View>

      {/* Recommended Places Title Skeleton */}
      <View style={styles.sectionHeader}>
        <Skeleton width={160} height={18} borderRadius={4} />
      </View>

      {/* Place Cards Skeletons */}
      <View style={styles.placeCard}>
        <Skeleton width="100%" height={200} borderRadius={16} />
        <View style={styles.placeCardContent}>
          <Skeleton width="70%" height={16} borderRadius={4} />
          <Skeleton width="40%" height={10} borderRadius={3} style={styles.marginTop8} />
          <View style={styles.placeCardFooter}>
            <Skeleton width="30%" height={12} borderRadius={3} />
            <Skeleton width={60} height={24} borderRadius={12} />
          </View>
        </View>
      </View>

      <View style={styles.placeCard}>
        <Skeleton width="100%" height={200} borderRadius={16} />
        <View style={styles.placeCardContent}>
          <Skeleton width="65%" height={16} borderRadius={4} />
          <Skeleton width="45%" height={10} borderRadius={3} style={styles.marginTop8} />
          <View style={styles.placeCardFooter}>
            <Skeleton width="25%" height={12} borderRadius={3} />
            <Skeleton width={60} height={24} borderRadius={12} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextWrapper: {
    marginLeft: 12,
  },
  marginTop6: {
    marginTop: 6,
  },
  marginTop8: {
    marginTop: 8,
  },
  marginRight10: {
    marginRight: 10,
  },
  searchSection: {
    marginBottom: 24,
  },
  carouselSection: {
    marginBottom: 24,
  },
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  placeCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeCardContent: {
    paddingVertical: 12,
  },
  placeCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
});
