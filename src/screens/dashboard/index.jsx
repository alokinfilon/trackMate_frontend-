import React, { useMemo, useState, useCallback } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from '../../context';
import { createDashboardStyles } from './dashboard.styles';
import { useTripDashboard } from './TripDashboardList.hooks';
import { Skeleton, AccountIcon } from '../../components';

export default function Dashboard({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createDashboardStyles(colors, isDarkMode), [colors, isDarkMode]);
  const [activeTab, setActiveTab] = useState('upcoming');

  const {
    trips,
    locations,
    loading,
    refreshing,
    error,
    refreshDashboard,
    userImage,
    actionLoadingId,
    handleUpdateStatus,
  } = useTripDashboard();

  // refreshDashboard internally decides whether to show skeleton (first load)
  // or do a silent background refresh (tab re-focus with cached data)
  useFocusEffect(
    useCallback(() => {
      refreshDashboard();
    }, [refreshDashboard])
  );

  const filteredTrips = useMemo(() => {
    return trips.filter(t => t.status?.toLowerCase() === activeTab.toLowerCase());
  }, [trips, activeTab]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const handleRebook = (locationId) => {
    const cleanId = String(locationId).replace('loc_', '');
    navigation.navigate('PlaceDetail', { id: cleanId, locationId: cleanId });
  };

  const handleAddReview = (placeName) => {
    Alert.alert(
      "Add Review",
      `How was your experience at ${placeName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => Alert.alert("Thank you!", "Your review has been submitted successfully.")
        }
      ]
    );
  };

  const handleCancelTrip = (tripId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            await handleUpdateStatus(tripId, 'cancelled');
          }
        }
      ]
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
          {/* Header Placeholder */}
          <View style={styles.listHeader}>
            <Skeleton width={40} height={40} borderRadius={20} />
            <View style={styles.flex1}>
              <Skeleton width={120} height={20} style={styles.alignSelfCenter} />
            </View>
            <View style={styles.spacer40} />
          </View>

          {/* Tabs Placeholder */}
          <View style={styles.tabsContainer}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={[styles.tabButton, styles.alignItemsCenter]}>
                <Skeleton width={70} height={16} />
              </View>
            ))}
          </View>

          {/* List Cards Placeholders */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.card}>
                {/* Card Header (Image & Title) */}
                <View style={styles.cardHeader}>
                  <Skeleton width={60} height={60} borderRadius={14} />
                  <View style={[styles.flex1, styles.gap6]}>
                    <Skeleton width={160} height={16} />
                    <Skeleton width={110} height={12} style={styles.marginTop2} />
                  </View>
                </View>

                {/* Dates & Price Row */}
                <View style={styles.cardDatesRow}>
                  <View style={styles.cardDatesInfo}>
                    <View style={styles.cardDateCol}>
                      <Skeleton width={65} height={14} />
                      <Skeleton width={50} height={10} style={styles.marginTop4} />
                    </View>
                    <View style={styles.cardDateDivider} />
                    <View style={styles.cardDateCol}>
                      <Skeleton width={65} height={14} />
                      <Skeleton width={50} height={10} style={styles.marginTop4} />
                    </View>
                  </View>
                  <View style={styles.cardPrice}>
                    <Skeleton width={50} height={16} />
                    <Skeleton width={35} height={10} style={styles.marginTop4} />
                  </View>
                </View>

                {/* Action Buttons Row */}
                <View style={styles.cardButtonsRow}>
                  <Skeleton width="100%" height={40} borderRadius={14} />
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        {/* Header Row */}
        <View style={styles.listHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('setting')}
            style={[
              styles.profileBtn,
              isDarkMode ? styles.profileBtnDark : styles.profileBtnLight,
            ]}
            activeOpacity={0.7}
          >
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.profileImage} />
            ) : (
              <AccountIcon stroke={colors.textPrimary} width={22} height={22} />
            )}
          </TouchableOpacity>
          <Text style={styles.listHeaderTitle}>My Booking</Text>
          <View style={styles.spacer40} />
        </View>

        {/* Segmented Tabs */}
        <View style={styles.tabsContainer}>
          {['Upcoming', 'Completed', 'Cancelled'].map((tab) => {
            const isActive = activeTab.toLowerCase() === tab.toLowerCase();
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabButton}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab.toLowerCase())}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Scrollable list of cards */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshDashboard({ isRefresh: true })}
              colors={['#FF6B35']}
              tintColor={isDarkMode ? '#FFFFFF' : '#FF6B35'}
            />
          }
        >
          {error && (
            <View style={styles.errorWrapper}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          )}

          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => {
              const matchedLocation = locations.find(l => 
                String(l.location_id) === String(trip.location_id).replace('loc_', '') || 
                String(l._id) === String(trip.location_id).replace('loc_', '')
              );
              const placeName = matchedLocation?.name || trip.location_id.replace('loc_', '').toUpperCase() || 'Elysium Gardens';
              const placeImage = matchedLocation?.media?.hero_image_url || matchedLocation?.media?.gallery?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300';
              const placeRegion = matchedLocation ? `${matchedLocation.geography?.city}, ${matchedLocation.geography?.state}` : 'London, England';
              const baseAmount = parseInt(trip.total_price, 10) || 1200;

              return (
                <TouchableOpacity
                  key={trip._id}
                  activeOpacity={0.9}
                  style={styles.card}
                  onPress={() => navigation.navigate('DashboardDetails', { tripId: trip._id })}
                >
                  {/* Card Header (Image, Title, Location) */}
                  <View style={styles.cardHeader}>
                    <Image source={{ uri: placeImage }} style={styles.cardPlaceThumbnail} resizeMode="cover" />
                    <View style={styles.flex1}>
                      <Text style={styles.cardPlaceName} numberOfLines={1}>
                        {placeName}
                      </Text>
                      <Text style={styles.cardPlaceSub} numberOfLines={1}>
                        {placeRegion}
                      </Text>
                    </View>
                  </View>

                  {/* Dates & Price Row */}
                  <View style={styles.cardDatesRow}>
                    <View style={styles.cardDatesInfo}>
                      <View style={styles.cardDateCol}>
                        <Text style={styles.cardDateText}>{formatDate(trip.start_date)}</Text>
                        <Text style={styles.cardDateLabel}>Check In</Text>
                      </View>
                      <View style={styles.cardDateDivider} />
                      <View style={styles.cardDateCol}>
                        <Text style={styles.cardDateText}>{formatDate(trip.end_date)}</Text>
                        <Text style={styles.cardDateLabel}>Check Out</Text>
                      </View>
                    </View>
                    <View style={styles.cardPrice}>
                      <Text style={styles.cardPriceText}>₹{baseAmount}</Text>
                      <Text style={styles.cardPriceLabel}>/ total</Text>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  {trip.status?.toLowerCase() === 'cancelled' && (
                    <View style={styles.cardButtonsRow}>
                      <TouchableOpacity
                        style={styles.cardWideBtn}
                        activeOpacity={0.8}
                        onPress={() => handleRebook(trip.location_id)}
                      >
                        <Text style={styles.cardWideBtnText}>Re-Book</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {trip.status?.toLowerCase() === 'completed' && (
                    <View style={styles.cardButtonsRow}>
                      <TouchableOpacity
                        style={styles.cardRebookBtn}
                        activeOpacity={0.8}
                        onPress={() => handleRebook(trip.location_id)}
                      >
                        <Text style={styles.cardRebookBtnText}>Re-Book</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cardReviewBtn}
                        activeOpacity={0.8}
                        onPress={() => handleAddReview(placeName)}
                      >
                        <Text style={styles.cardReviewBtnText}>Add Review</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {trip.status?.toLowerCase() === 'upcoming' && (
                    <View style={styles.cardButtonsRow}>
                      <TouchableOpacity
                        style={styles.cardCancelBtn}
                        activeOpacity={0.8}
                        onPress={() => handleCancelTrip(trip._id)}
                        disabled={actionLoadingId === trip._id}
                      >
                        {actionLoadingId === trip._id ? (
                          <ActivityIndicator size="small" color="#EF4444" />
                        ) : (
                          <Text style={styles.cardCancelBtnText}>Cancel</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cardReviewBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('DashboardDetails', { tripId: trip._id })}
                      >
                        <Text style={styles.cardReviewBtnText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No {activeTab} bookings found.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
