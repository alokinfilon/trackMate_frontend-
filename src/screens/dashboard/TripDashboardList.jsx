import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { useTripDashboard } from './TripDashboardList.hooks';
import { createStyles } from './TripDashboardList.styles';

export default function TripDashboardList() {
  const {
    loading,
    error,
    activeTab,
    setActiveTab,
    filteredTrips,
    actionLoadingId,
    handleEditPress
  } = useTripDashboard();

  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderTripCard = ({ item }) => {
    const isUpdating = actionLoadingId === item._id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.locationTitle}>{item.location_id.replace('loc_', '').toUpperCase()}</Text>

          <View style={styles.headerRightContainer}>
            <View style={[styles.badge, { backgroundColor: item.status === 'partially completed' ? '#FFF3CD' : '#D1E7DD' }]}>
              <Text style={[styles.badgeText, { color: item.status === 'partially completed' ? '#856404' : '#0F5132' }]}>
                {item.status}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPress(item)}
              disabled={isUpdating}
            >
              <Text style={styles.editButtonText}>✏️ Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtext}>📍 {item.sublocation?.join(', ').replace(/sub_/g, '')}</Text>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.label}>DURATION</Text>
            <Text style={styles.dateText}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.label}>TOTAL PRICE ({item.number_of_people} Pax)</Text>
            <Text style={styles.priceText}>₹{item.total_price}</Text>
          </View>
        </View>

        {isUpdating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleBar}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'upcoming' && styles.activeToggleButton]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.toggleText, activeTab === 'upcoming' && styles.activeToggleText]}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'completed' && styles.activeToggleButton]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.toggleText, activeTab === 'completed' && styles.activeToggleText]}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'cancelled' && styles.activeToggleButton]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.toggleText, activeTab === 'cancelled' && styles.activeToggleText]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item._id}
        renderItem={renderTripCard}
        contentContainerStyle={styles.listPadding}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches found under this status.</Text>
          </View>
        }
      />
    </View>
  );
}