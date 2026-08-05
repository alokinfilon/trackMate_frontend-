const ENDPOINTS = {
  auth: {
    sync: '/auth/auth0-sync',
    profile: '/auth/profile',
    preferences: '/auth/preferences',
  },
  trips: {
    base: '/api/trips',
    status: (tripId) => `/api/trips/${tripId}/update-status`,
    analytics: '/api/trips/analytics/chart-stats',
  },
  locations: {
    base: (page = 1, limit = 10) => `/locations?page=${page}&limit=${limit}`,
  },
  gallery: {
    base: (tripId) => `/api/gallery/${tripId}`,
    images: (imageId) => `/api/gallery/images/${imageId}`,
    imageCollection: (imageId) => `/api/gallery/images/${imageId}/collection`,
    collections: (tripId) => `/api/gallery/collections?tripId=${tripId}`,
    collection: (colId) => `/api/gallery/collections/${colId}`,
    createCollection: '/api/gallery/collections',
    updateCollection: (colId) => `/api/gallery/collections/${colId}`,
    deleteCollection: (colId) => `/api/gallery/collections/${colId}`,
    shareCollection: (colId) => `/api/gallery/collections/${colId}/share`,
  },
};

export default ENDPOINTS;
