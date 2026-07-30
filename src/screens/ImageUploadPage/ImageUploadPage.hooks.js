import { useState, useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import authService from '../../services/authService';
import apiClient from '../../services/apiClient';

export const useImageUpload = (passedTripId) => {
  const [viewMode, setViewMode] = useState('gallery');

  // Internal state to hold fallback ID and trips list
  const [trips, setTrips] = useState([]);
  const [internalTripId, setInternalTripId] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(false);

  const [loadingGallery, setLoadingGallery] = useState(false);
  const [collections, setCollections] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [userImage, setUserImage] = useState(null);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionAccessibility, setCollectionAccessibility] = useState('shared');
  const [creatingCollection, setCreatingCollection] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('Testing my cloud gallery upload!');
  const [accessibility, setAccessibility] = useState('shared');

  const activeTripId = passedTripId || internalTripId;
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collectionPhotos, setCollectionPhotos] = useState([]);
  const [loadingCollectionPhotos, setLoadingCollectionPhotos] = useState(false);
  const [collectionTripId, setCollectionTripId] = useState(null);
  const [selectedTripFilters, setSelectedTripFilters] = useState([]);

  // Get active trip details
  const activeTrip = trips.find(t => t._id === activeTripId);
  const getTripTitle = (trip) => {
    if (!trip) return 'Select Trip';
    const loc = trip.location_id || trip.location || '';
    return loc.replace('loc_', '').replace(/_/g, ' ').toUpperCase() || 'Trip';
  };
  const activeTripName = getTripTitle(activeTrip);

  useEffect(() => {
    fetchFallbackTripId();
  }, [passedTripId]);

  useEffect(() => {
    if (viewMode === 'gallery' && (activeTripId || selectedTripFilters.length > 0)) {
      fetchGalleryData();
      fetchCollectionsData(); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, activeTripId, selectedTripFilters]);

  useEffect(() => {
    if (viewMode === 'collection-detail' && selectedCollectionId) {
      fetchCollectionPhotosData(selectedCollectionId);
    }
  }, [viewMode, selectedCollectionId, allImages]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient('/auth/profile');
        const json = await res.json();
        if (json.success && json.data?.user_image) {
          setUserImage(json.data.user_image);
        }
      } catch (err) {
        console.warn('Failed to load user avatar in gallery:', err);
      }
    };
    fetchProfile();
  }, []);

  const fetchFallbackTripId = async () => {
    try {
      setLoadingTrip(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/trips`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const rawText = await response.text();
      let json;
      try {
        json = JSON.parse(rawText);
      } catch (e) {
        console.error("Non-JSON trips response:", rawText);
        return;
      }

      if (response.ok && json.success && Array.isArray(json.data)) {
        setTrips(json.data);
        if (!passedTripId && json.data.length > 0) {
          const validTrip = json.data.find(trip => trip.status !== 'cancelled') || json.data[0];
          if (validTrip && validTrip._id) {
            setInternalTripId(validTrip._id);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch fallback trip ID:", err);
    } finally {
      setLoadingTrip(false);
    }
  };

  const fetchCollectionsData = async () => {
    const targetTripIds = selectedTripFilters.length > 0 ? selectedTripFilters : [activeTripId].filter(Boolean);
    if (targetTripIds.length === 0) return;
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const promises = targetTripIds.map(async (id) => {
        const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/collections?tripId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const json = await response.json();
        if (response.ok && json.success) {
          return Array.isArray(json.data) ? json.data : (json.collections || json.data?.collections || []);
        }
        return [];
      });

      const results = await Promise.all(promises);
      const allCols = results.flat();
      const uniqueCols = [];
      const seen = new Set();
      for (const col of allCols) {
        if (col && col._id && !seen.has(col._id)) {
          seen.add(col._id);
          uniqueCols.push(col);
        }
      }
      setCollections(uniqueCols);
    } catch (err) {
      console.error("Failed to fetch collections:", err);
    }
  };

  const fetchGalleryData = async () => {
    const targetTripIds = selectedTripFilters.length > 0 ? selectedTripFilters : [activeTripId].filter(Boolean);
    if (targetTripIds.length === 0) return;

    try {
      setLoadingGallery(true);
      const token = await authService.getAccessToken();
      if (!token) {
        Alert.alert("Error", "Session expired. Please log in again.");
        return;
      }

      const promises = targetTripIds.map(async (id) => {
        const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const rawText = await response.text();
        let json;
        try {
          json = JSON.parse(rawText);
        } catch (e) {
          console.error("Non-JSON gallery response:", rawText);
          return [];
        }
        if (response.ok && json.success) {
          return Array.isArray(json.data) ? json.data : (json.images || json.data?.images || []);
        }
        return [];
      });

      const results = await Promise.all(promises);
      const allImgs = results.flat();
      const uniqueImgs = [];
      const seen = new Set();
      for (const img of allImgs) {
        if (img && img._id && !seen.has(img._id)) {
          seen.add(img._id);
          uniqueImgs.push(img);
        }
      }
      setAllImages(uniqueImgs);
    } catch (err) {
      console.error("Gallery Fetch Error: ", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const fetchCollectionPhotosData = async (colId) => {
    if (!colId) return;

    if (colId === 'loose') {
      const loose = allImages.filter(img => !img.collectionId && !img.collection);
      setCollectionPhotos(loose);
      return;
    }

    try {
      setLoadingCollectionPhotos(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/collections/${colId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      if (response.ok && json.success) {
        setCollectionPhotos(json.data?.photos || json.photos || []);
      } else {
        setCollectionPhotos([]);
      }
    } catch (err) {
      console.error("Failed to fetch collection photos:", err);
      setCollectionPhotos([]);
    } finally {
      setLoadingCollectionPhotos(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!activeTripId) {
      Alert.alert("Error", "No active trip ID available.");
      return;
    }
    if (!collectionName.trim()) {
      Alert.alert("Error", "Collection name is required.");
      return;
    }

    try {
      setCreatingCollection(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tripId: collectionTripId,
          name: collectionName,
          description: collectionDescription,
          accessibility: collectionAccessibility
        })
      });

      const rawText = await response.text();
      let json;
      try {
        json = JSON.parse(rawText);
      } catch (e) {
        throw new Error("Server returned non-JSON response.");
      }

      if (response.ok && (json.success || json.data)) {
        Alert.alert("Success 🎉", "New collection created successfully!");
        setCreateModalVisible(false);
        setCollectionName('');
        setCollectionDescription('');
        fetchGalleryData();
        fetchCollectionsData();
      } else {
        throw new Error(json.error || json.message || "Failed to create collection.");
      }
    } catch (err) {
      console.error("Create Collection Error: ", err);
      Alert.alert("Error", err.message || "Network error while creating collection.");
    } finally {
      setCreatingCollection(false);
    }
  };

  const handleUpdateCollection = async () => {
    if (!editingCollection?._id) return;
    if (!collectionName.trim()) {
      Alert.alert("Error", "Collection name is required.");
      return;
    }

    try {
      setCreatingCollection(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/collections/${editingCollection._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tripId: collectionTripId,
          name: collectionName,
          description: collectionDescription,
          accessibility: collectionAccessibility
        })
      });

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert("Success 🎉", "Collection updated successfully!");
        setCreateModalVisible(false);
        setEditingCollection(null);
        setCollectionName('');
        setCollectionDescription('');
        fetchGalleryData();
        fetchCollectionsData();
      } else {
        throw new Error(json.message || "Failed to update collection.");
      }
    } catch (err) {
      console.error("Update Collection Error: ", err);
      Alert.alert("Error", err.message || "Network error while updating collection.");
    } finally {
      setCreatingCollection(false);
    }
  };

  const handleSaveCollection = async () => {
    if (editingCollection) {
      await handleUpdateCollection();
    } else {
      await handleCreateCollection();
    }
  };

  const handleDeleteCollection = async (colId) => {
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/collections/${colId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert("Deleted", "Collection deleted successfully.");
        fetchGalleryData();
        fetchCollectionsData();
      } else {
        throw new Error(json.message || "Failed to delete collection.");
      }
    } catch (err) {
      console.error("Delete Collection Error: ", err);
      Alert.alert("Error", err.message || "Network error while deleting collection.");
    }
  };

  const handleRemoveImageFromCollection = async (imageId) => {
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/images/${imageId}/collection`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collectionId: null
        })
      });

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert("Success 🎉", "Image removed from collection successfully.");
        fetchGalleryData();
      } else {
        throw new Error(json.message || "Failed to remove image from collection.");
      }
    } catch (err) {
      console.error("Remove Image Error: ", err);
      Alert.alert("Error", err.message || "Network error while removing image.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert("Deleted 🎉", "Photo deleted successfully.");
        fetchGalleryData();
        if (selectedCollectionId) {
          fetchCollectionPhotosData(selectedCollectionId);
        }
      } else {
        throw new Error(json.message || "Failed to delete photo.");
      }
    } catch (err) {
      console.error("Delete Image Error: ", err);
      Alert.alert("Error", err.message || "Network error while deleting photo.");
    }
  };

  const selectTrip = (tripId) => {
    setInternalTripId(tripId);
    setSelectedCollectionId(null);
  };

  const startEditCollection = (col) => {
    setEditingCollection(col);
    setCollectionName(col.name);
    setCollectionDescription(col.description || '');
    setCollectionAccessibility(col.accessibility || 'shared');
    setCollectionTripId(col.tripId || null);
    setCreateModalVisible(true);
  };

  const startCreateCollection = () => {
    setEditingCollection(null);
    setCollectionName('');
    setCollectionDescription('');
    setCollectionAccessibility('shared');
    setCollectionTripId(activeTripId);
    setCreateModalVisible(true);
  };

  const takePhoto = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission Needed",
            message: "TrackMate needs access to your camera to take photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Camera access is required to take photos.");
          return;
        }
      } catch (err) {
        console.warn("Permission request error:", err);
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Camera Error', `Error code: ${response.errorCode}`);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    if (!activeTripId) {
      Alert.alert("Error", "Cannot upload image without a valid trip ID.");
      return;
    }
    if (!photo || !photo.uri) {
      Alert.alert('Please capture a photo first');
      return;
    }

    setUploading(true);

    try {
      const token = await authService.getAccessToken();
      if (!token) {
        Alert.alert('Error', 'Session expired. Please log in again.');
        setUploading(false);
        return;
      }

      const formData = new FormData();
      const cleanUri = Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');

      formData.append('image', {
        uri: cleanUri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || `trip_image_${Date.now()}.jpg`,
      });

      formData.append('caption', caption);
      formData.append('accessibility', accessibility);

      if (selectedCollectionId) {
        formData.append('collectionId', selectedCollectionId);
      }

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/${activeTripId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const rawText = await response.text();
      let json;
      try {
        json = JSON.parse(rawText);
      } catch (e) {
        throw new Error(`Server returned non-JSON response.`);
      }

      if (response.ok && json.success) {
        Alert.alert('Success 🎉', 'Image uploaded into your gallery storage!');
        setPhoto(null);
        setViewMode('gallery');
      } else {
        throw new Error(json.message || 'Server upload execution sequence failed');
      }
    } catch (err) {
      console.error('Upload Failure Log: ', err);
      Alert.alert('Upload Failed', err.message || 'Network connectivity error.');
    } finally {
      setUploading(false);
    }
  };

  return {
    viewMode,
    setViewMode,
    loadingGallery,
    loadingTrip,
    tripId: activeTripId,
    trips,
    activeTripName,
    selectTrip,
    collections,
    allImages,
    createModalVisible,
    setCreateModalVisible,
    editingCollection,
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    collectionAccessibility,
    setCollectionAccessibility,
    creatingCollection,
    handleCreateCollection: handleSaveCollection,
    photo,
    takePhoto,
    uploadImage,
    uploading,
    selectedCollectionId,
    setSelectedCollectionId,
    caption,
    setCaption,
    accessibility,
    setAccessibility,
    userImage,
    startEditCollection,
    startCreateCollection,
    handleDeleteCollection,
    handleRemoveImageFromCollection,
    collectionPhotos,
    loadingCollectionPhotos,
    fetchCollectionPhotosData,
    collectionTripId,
    setCollectionTripId,
    getTripTitle,
    selectedTripFilters,
    setSelectedTripFilters,
    handleDeleteImage,
  };
};
