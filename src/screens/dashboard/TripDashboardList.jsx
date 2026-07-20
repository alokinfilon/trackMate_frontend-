import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  Dimensions 
} from 'react-native';
import authService from '../../services/authService'; 

export default function TripDashboardList() {
  // 1. Component States
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Active toggle options: 'upcoming' | 'completed' | 'cancelled'
  const [activeTab, setActiveTab] = useState('upcoming'); 

  // 2. Fetch Trip Records on Mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = await authService.getAccessToken();

        if (!token) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        // Replace this endpoint string if your trip retrieval URL is structured differently
        const response = await fetch('https://trackmate-x7ue.onrender.com/api/trips', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const rawText = await response.text();

        if (rawText.trim().startsWith('<')) {
          setError("Server error page returned.");
          setLoading(false);
          return;
        }

        const json = JSON.parse(rawText);

        if (json.success && json.data) {
          setTrips(json.data);
        } else {
          setError(json.message || 'Failed to capture trip records.');
        }
      } catch (err) {
        console.error("Trip Fetch Error: ", err);
        setError('Network connectivity failure.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // 3. Client-side state filtering based on active status toggles
  const filteredTrips = trips.filter(trip => {
    const status = trip.status?.toLowerCase();
    
    if (activeTab === 'upcoming') {
      return status === 'upcoming';
    }
    if (activeTab === 'completed') {
      // Grouping both requested variations under the same middle tab selection
      return status === 'completed' || status === 'partially completed';
    }
    if (activeTab === 'cancelled') {
      return status === 'cancelled';
    }
    return false;
  });

  // 4. Formatting date strings cleanly
  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // 5. Trip card structure item renderer
  const renderTripCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.locationTitle}>{item.location_id.replace('loc_', '').toUpperCase()}</Text>
        <View style={[styles.badge, { backgroundColor: item.status === 'partially completed' ? '#FFF3CD' : '#D1E7DD' }]}>
          <Text style={[styles.badgeText, { color: item.status === 'partially completed' ? '#856404' : '#0F5132' }]}>
            {item.status}
          </Text>
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
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color="#4D96FF" />
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
      {/* Three Segment Toggle Header Controls Bar */}
      <View style={styles.toggleBar}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'upcoming' && styles.activeToggleButton]}
          onClick={() => setActiveTab('upcoming')}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.toggleText, activeTab === 'upcoming' && styles.activeToggleText]}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'completed' && styles.activeToggleButton]}
          onClick={() => setActiveTab('completed')}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.toggleText, activeTab === 'completed' && styles.activeToggleText]}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'cancelled' && styles.activeToggleButton]}
          onClick={() => setActiveTab('cancelled')}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.toggleText, activeTab === 'cancelled' && styles.activeToggleText]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      {/* Core Dynamic Content Container List */}
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item._id}
        renderItem={renderTripCard}
        contentContainerStyle={styles.listPadding}
        scrollEnabled={false} // Disable list scrolling so it nests inside a Dashboard ScrollView perfectly
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches found under this status.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  centerContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBar: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  activeToggleText: {
    color: '#111111',
  },
  listPadding: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4D96FF',
  },
  errorText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#888888',
    fontSize: 13,
  },
});
