import { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { apiClient } from '../../services';
import {
  fetchTrips,
  silentRefreshTrips,
  updateTripStatus,
  setRefreshing,
  selectTrips,
  selectTripsLoading,
  selectTripsRefreshing,
  selectTripsError,
  selectActionLoadingId,
  fetchProfile,
  selectUserImage,
} from '../../store/slices';

export const useTripDashboard = () => {
  const dispatch = useAppDispatch();

  // Read from Redux store — shared cache, no duplicate fetches
  const trips = useAppSelector(selectTrips);
  const loading = useAppSelector(selectTripsLoading);
  const refreshing = useAppSelector(selectTripsRefreshing);
  const error = useAppSelector(selectTripsError);
  const actionLoadingId = useAppSelector(selectActionLoadingId);
  const userImage = useAppSelector(selectUserImage);

  const [locations, setLocations] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const fetchLocations = useCallback(async () => {
    try {
      const response = await apiClient('/locations?page=1&limit=100');
      const json = await response.json();
      const sites = json && (json.historicalSites || json.data || (Array.isArray(json) ? json : []));
      if (sites) {
        setLocations(sites);
      }
    } catch (err) {
      console.error('Failed to fetch locations in dashboard hook:', err);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const initDashboard = useCallback(
    async (options = {}) => {
      const { isRefresh = false } = options;

      if (isRefresh) {
        // Pull-to-refresh: show spinner in scroll view
        dispatch(setRefreshing(true));
        await Promise.all([dispatch(fetchProfile()), dispatch(fetchTrips()), fetchLocations()]);
      } else if (trips.length === 0) {
        // First load: no cached trips, show full skeleton
        await Promise.all([dispatch(fetchProfile()), dispatch(fetchTrips()), fetchLocations()]);
      } else {
        // Tab re-focus with cached trips: silent background refresh — NO skeleton
        dispatch(fetchProfile()); // TTL-cached, usually a no-op
        dispatch(silentRefreshTrips());
        fetchLocations();
      }
    },
    [dispatch, trips.length, fetchLocations]
  );

  const handleUpdateStatus = useCallback(
    async (tripId, newStatus) => {
      const result = await dispatch(updateTripStatus({ tripId, newStatus }));
      if (updateTripStatus.rejected.match(result)) {
        Alert.alert('Failed', result.payload || 'Could not update trip status.');
        // Re-fetch to revert the optimistic update
        dispatch(fetchTrips());
      }
    },
    [dispatch]
  );

  return {
    trips,
    loading,
    refreshing,
    error,
    actionLoadingId,
    userImage,
    refreshDashboard: initDashboard,
    handleUpdateStatus,
    locations,
    selectedTripId,
    setSelectedTripId,
  };
};
