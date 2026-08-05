import apiClient from './apiClient';
import ENDPOINTS from './endpoints';

const httpService = {

  get: (endpoint, options = {}) => apiClient(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) => apiClient(endpoint, {
    ...options,
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body)
  }),

  put: (endpoint, body, options = {}) => apiClient(endpoint, {
    ...options,
    method: 'PUT',
    body: body instanceof FormData ? body : JSON.stringify(body)
  }),

  patch: (endpoint, body, options = {}) => apiClient(endpoint, {
    ...options,
    method: 'PATCH',
    body: body instanceof FormData ? body : JSON.stringify(body)
  }),

  delete: (endpoint, options = {}) => apiClient(endpoint, { ...options, method: 'DELETE' }),

  // Centralized API calls grouped by category
  auth: {
    syncAuth0User: (token, signal) =>
      httpService.post(ENDPOINTS.auth.sync, null, {
        headers: { Authorization: `Bearer ${token}` },
        signal
      }),

    getProfile: () =>
      httpService.get(ENDPOINTS.auth.profile),

    updateProfile: (profileData) =>
      httpService.patch(ENDPOINTS.auth.profile, profileData),

    getPreferences: () =>
      httpService.get(ENDPOINTS.auth.preferences),

    updatePreferences: (preferencesData) =>
      httpService.patch(ENDPOINTS.auth.preferences, preferencesData),
  },

  trips: {
    getTrips: () =>
      httpService.get(ENDPOINTS.trips.base),

    createTrip: (tripData) =>
      httpService.post(ENDPOINTS.trips.base, tripData),

    updateTripStatus: (tripId, status) =>
      httpService.patch(ENDPOINTS.trips.status(tripId), { status }),

    getAnalytics: () =>
      httpService.get(ENDPOINTS.trips.analytics),
  },

  locations: {
    getLocations: (page = 1, limit = 10) =>
      httpService.get(ENDPOINTS.locations.base(page, limit)),
  },

  gallery: {
    getImages: (tripId) =>
      httpService.get(ENDPOINTS.gallery.base(tripId)),

    uploadImage: (tripId, formData) =>
      httpService.post(ENDPOINTS.gallery.base(tripId), formData),

    deleteImage: (imageId) =>
      httpService.delete(ENDPOINTS.gallery.images(imageId)),

    removeImageFromCollection: (imageId) =>
      httpService.patch(ENDPOINTS.gallery.imageCollection(imageId), { collectionId: null }),

    getCollections: (tripId) =>
      httpService.get(ENDPOINTS.gallery.collections(tripId)),

    getCollection: (colId) =>
      httpService.get(ENDPOINTS.gallery.collection(colId)),

    createCollection: (collectionData) =>
      httpService.post(ENDPOINTS.gallery.createCollection, collectionData),

    updateCollection: (colId, collectionData) =>
      httpService.put(ENDPOINTS.gallery.updateCollection(colId), collectionData),

    patchCollection: (colId, collectionData) =>
      httpService.patch(ENDPOINTS.gallery.updateCollection(colId), collectionData),

    deleteCollection: (colId) =>
      httpService.delete(ENDPOINTS.gallery.deleteCollection(colId)),

    shareCollection: (colId, identifier, role) =>
      httpService.post(ENDPOINTS.gallery.shareCollection(colId), { identifier, role }),
  },
};

export default httpService;
