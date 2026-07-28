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

const STATUS_COLORS = {
  'upcoming': '#6C63FF',
  'partially completed': '#ED8936',
  'completed': '#38B2AC',
  'cancelled': '#E53E3E',
};

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
    const statusColor = STATUS_COLORS[item.status?.toLowerCase()] || colors.textTertiary;

    return (
      <View style={styles.card}>
        {/* Left accent stripe */}
        <View style={[styles.cardAccentStripe, { backgroundColor: statusColor }]} />

        <View style={styles.cardHeader}>
          <Text style={styles.locationTitle}>{item.location_id.replace('loc_', '').toUpperCase()}</Text>

          <View style={styles.headerRightContainer}>
            <View style={styles.badge}>
              <Text style={[styles.badgeText, { color: statusColor }]}>
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
            <Text style={styles.label}>📅 DURATION</Text>
            <Text style={styles.dateText}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.label}>💰 TOTAL ({item.number_of_people} Pax)</Text>
            <Text style={styles.priceText}>₹{item.total_price}</Text>
          </View>
        </View>

        {isUpdating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#6C63FF" />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color="#6C63FF" />
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
      {/* Neumorphic Segmented Toggle */}
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