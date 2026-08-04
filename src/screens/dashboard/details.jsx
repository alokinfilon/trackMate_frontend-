import React, { useMemo, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context';
import { createDashboardStyles } from './dashboard.styles';
import { useTripDashboard } from './TripDashboardList.hooks';
import { Skeleton, Arrow, StarIconComponent } from '../../components';

export default function DashboardDetails({ route, navigation }) {
  const { tripId } = route.params || {};
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createDashboardStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    trips,
    locations,
    loading,
    selectedTripId,
    setSelectedTripId,
    actionLoadingId,
    handleUpdateStatus,
  } = useTripDashboard();

  useEffect(() => {
    if (tripId) {
      setSelectedTripId(tripId);
    }
  }, [tripId, setSelectedTripId]);

  // Find currently active selected trip
  const selectedTrip = useMemo(() => {
    return trips.find(t => t._id === selectedTripId);
  }, [trips, selectedTripId]);

  // Match the active trip with full location details fetched from DB
  const matchedLocation = useMemo(() => {
    if (!selectedTrip || !locations.length) return null;
    const cleanId = String(selectedTrip.location_id).replace('loc_', '');
    return locations.find(loc => String(loc.location_id) === cleanId || String(loc._id) === cleanId);
  }, [selectedTrip, locations]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const handleCancelPress = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            if (selectedTrip) {
              await handleUpdateStatus(selectedTrip._id, 'cancelled');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
          {/* Header Row */}
          <View style={styles.detailsHeader}>
            <Skeleton width={40} height={40} borderRadius={20} />
            <View style={styles.flex1}>
              <Skeleton width={130} height={20} style={styles.alignSelfCenter} />
            </View>
            <View style={styles.spacer40} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.summaryCard}>
              {/* 1. Destination summary header row */}
              <View style={styles.headerRow}>
                <Skeleton width={85} height={85} borderRadius={16} />
                <View style={[styles.flex1, styles.gap6]}>
                  <Skeleton width={180} height={18} />
                  <Skeleton width={120} height={12} style={styles.marginTop2} />
                  <Skeleton width={80} height={18} style={styles.marginTop4} />
                </View>
              </View>

              <View style={styles.divider} />

              {/* 2. Booking details section */}
              <Skeleton width={120} height={16} style={styles.marginBottom14} />
              {[1, 2, 3].map((i) => (
                <View key={i} style={styles.detailRow}>
                  <Skeleton width={110} height={13} />
                  <Skeleton width={130} height={13} />
                </View>
              ))}

              <View style={styles.divider} />

              {/* 3. Guest details section */}
              <Skeleton width={100} height={16} style={styles.marginBottom14} />
              {[1, 2, 3].map((i) => (
                <View key={i} style={styles.detailRow}>
                  <Skeleton width={90} height={13} />
                  <Skeleton width={60} height={13} />
                </View>
              ))}

              <View style={styles.divider} />

              {/* 4. Payment details section */}
              <Skeleton width={110} height={16} style={styles.marginBottom14} />
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.detailRow}>
                  <Skeleton width={100} height={13} />
                  <Skeleton width={80} height={13} />
                </View>
              ))}

              <View style={styles.divider} />

              {/* 5. Bottom action button */}
              <Skeleton width="100%" height={52} borderRadius={20} style={styles.marginTop14} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  // Calculate pricing values based on active trip
  const baseAmount = selectedTrip ? parseInt(selectedTrip.total_price, 10) || 1200 : 0;
  const taxAmount = Math.round(baseAmount * 0.05); // 5% tax
  const totalAmount = baseAmount + taxAmount;

  // Mock guest room allocation
  const guestCount = selectedTrip?.number_of_people || 1;
  const roomCount = Math.max(1, Math.ceil(guestCount / 2));

  // Matched location details
  const placeName = matchedLocation?.name || selectedTrip?.location_id.replace('loc_', '').toUpperCase() || 'Elysium Gardens';
  const placeImage = matchedLocation?.media?.hero_image_url || matchedLocation?.media?.gallery?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300';
  const placeRating = matchedLocation?.overall_rating || '4.5';
  const placeRegion = matchedLocation ? `${matchedLocation.geography?.city}, ${matchedLocation.geography?.state}` : 'London, England';

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
        <View style={styles.detailsHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Arrow color={colors.textPrimary} size={20} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.detailsHeaderTitle}>Review Summary</Text>
          {selectedTrip && selectedTrip.status?.toLowerCase() !== 'cancelled' ? (
            <TouchableOpacity
              onPress={handleCancelPress}
              style={styles.cancelHeaderBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelHeaderBtnText}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.spacer40} />
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary details card */}
          {selectedTrip ? (
            <View style={styles.summaryCard}>
              
              {/* 1. Destination summary header row */}
              <View style={styles.headerRow}>
                <Image source={{ uri: placeImage }} style={styles.placeThumbnail} resizeMode="cover" />
                
                <View style={styles.headerTextCol}>
                  <Text style={styles.placeName} numberOfLines={2}>
                    {placeName}
                  </Text>
                  <Text style={styles.placeSub} numberOfLines={1}>
                    {placeRegion}
                  </Text>
                  <Text style={styles.placePrice}>
                    ₹{baseAmount} <Text style={styles.placePriceUnit}>/ total</Text>
                  </Text>
                </View>

                <View style={styles.ratingCol}>
                  <StarIconComponent size={14} color="#FF6B35" />
                  <Text style={styles.ratingText}>{placeRating}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* 2. Booking details section */}
              <Text style={styles.sectionTitle}>Booking Details</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Booking Date & Time</Text>
                <Text style={styles.detailValue}>
                  {selectedTrip.createdAt ? formatDate(selectedTrip.createdAt) + ' | 11:20 AM' : '04/03/25 | 11:20 AM'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Check IN</Text>
                <Text style={styles.detailValue}>{formatDate(selectedTrip.start_date)}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Check Out</Text>
                <Text style={styles.detailValue}>{formatDate(selectedTrip.end_date)}</Text>
              </View>

              <View style={styles.divider} />

              {/* 3. Guest details section */}
              <Text style={styles.sectionTitle}>Guest Details</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guest Name</Text>
                <Text style={styles.detailValue}>Alvi Ahmed</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guest</Text>
                <Text style={styles.detailValue}>
                  {guestCount < 10 ? `0${guestCount}` : guestCount}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Room</Text>
                <Text style={styles.detailValue}>
                  {roomCount < 10 ? `0${roomCount}` : roomCount}
                </Text>
              </View>

              <View style={styles.divider} />

              {/* 4. Payment details section */}
              <Text style={styles.sectionTitle}>Payment Details</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>₹{baseAmount}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tax</Text>
                <Text style={styles.detailValue}>₹{taxAmount}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Amount</Text>
                <Text style={styles.detailValue}>₹{totalAmount}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Status</Text>
                <View style={styles.methodBadge}>
                  <Text style={styles.methodBadgeText}>
                    {selectedTrip.status?.toLowerCase() === 'completed' ? 'Paid (Online)' : 'Cash on Arrival'}
                  </Text>
                </View>
              </View>

              {/* 5. Bottom action button */}
              {selectedTrip.status?.toLowerCase() === 'upcoming' ? (
                <TouchableOpacity
                  style={styles.actionPayBtn}
                  activeOpacity={0.8}
                  onPress={() => handleUpdateStatus(selectedTrip._id, 'completed')}
                  disabled={actionLoadingId === selectedTrip._id}
                >
                  {actionLoadingId === selectedTrip._id ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.actionPayBtnText}>Pay ₹{totalAmount}</Text>
                  )}
                </TouchableOpacity>
              ) : selectedTrip.status?.toLowerCase() === 'completed' ? (
                <View style={[styles.actionPayBtn, styles.actionPayBtnCompleted]}>
                  <Text style={styles.actionPayBtnText}>Payment Completed & Confirmed</Text>
                </View>
              ) : (
                <View style={[styles.actionPayBtn, styles.actionPayBtnCancelled]}>
                  <Text style={styles.actionPayBtnText}>Trip Cancelled</Text>
                </View>
              )}

            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Error loading trip details.
              </Text>
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
