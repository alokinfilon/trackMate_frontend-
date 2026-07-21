import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import authService from '../../services/authService';

export const useTripDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const token = await authService.getAccessToken();

      if (!token) {
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

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

  const handleUpdateStatus = async (tripId, newStatus) => {
    try {
      setActionLoadingId(tripId);
      const token = await authService.getAccessToken();

      if (!token) {
        Alert.alert("Error", "Session expired. Please log in again.");
        return;
      }

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/trips/${tripId}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const rawText = await response.text();
      const json = JSON.parse(rawText);

      if (response.ok && (json.success || json.data)) {
        setTrips(prevTrips =>
          prevTrips.map(trip =>
            trip._id === tripId ? { ...trip, status: newStatus } : trip
          )
        );
      } else {
        Alert.alert("Failed", json.message || "Could not update trip status.");
      }

      console.log('====================================');
      console.log(tripId);
      console.log('====================================');
    } catch (err) {
      console.error("Status Update Error: ", err);
      Alert.alert("Error", "Network connectivity failure while updating status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleEditPress = (item) => {
    Alert.alert(
      "Update Trip Status",
      `Manage status for ${item.location_id.replace('loc_', '').toUpperCase()}`,
      [
        {
          text: "Mark as Completed",
          onPress: () => handleUpdateStatus(item._id, 'completed')
        },
        {
          text: "Cancel Trip",
          style: 'destructive',
          onPress: () => handleUpdateStatus(item._id, 'cancelled')
        },
        {
          text: "Dismiss",
          style: "cancel"
        }
      ]
    );
  };

  const filteredTrips = trips.filter(trip => {
    const status = trip.status?.toLowerCase();
    if (activeTab === 'upcoming') {
      return status === 'upcoming';
    }
    if (activeTab === 'completed') {
      return status === 'completed' || status === 'partially completed';
    }
    if (activeTab === 'cancelled') {
      return status === 'cancelled';
    }
    return false;
  });

  return {
    loading,
    error,
    activeTab,
    setActiveTab,
    filteredTrips,
    actionLoadingId,
    handleEditPress
  };
};
