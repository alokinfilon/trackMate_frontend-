import { useState, useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { authService, apiClient, httpService } from '../../services';

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

  const [photosList, setPhotosList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [accessibility, setAccessibility] = useState('shared');

  const activeTripId = passedTripId || internalTripId;
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collectionPhotos, setCollectionPhotos] = useState([]);
  const [loadingCollectionPhotos, setLoadingCollectionPhotos] = useState(false);
  const [collectionTripId, setCollectionTripId] = useState(null);
  const [selectedTripFilters, setSelectedTripFilters] = useState([]);
  const [collectionPermissions, setCollectionPermissions] = useState({
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true
  });
  const [refreshing, setRefreshing] = useState(false);

  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareIdentifier, setShareIdentifier] = useState('');
  const [shareRole, setShareRole] = useState('viewer');
  const [sharingCollection, setSharingCollection] = useState(false);

  const handleShareCollection = async () => {
    if (!shareIdentifier.trim()) {
      Alert.alert('Error', 'Please enter an email or phone number.');
      return;
    }
    if (!selectedCollectionId) {
      Alert.alert('Error', 'No collection selected.');
      return;
    }
    try {
      setSharingCollection(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await httpService.gallery.shareCollection(selectedCollectionId, shareIdentifier.trim(), shareRole);

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert('Success 🎉', 'Collection shared successfully!');
        setShareModalVisible(false);
        setShareIdentifier('');
      } else {
        throw new Error(json.error || 'Failed to share collection.');
      }
    } catch (err) {
      console.error('Share Collection Error:', err);
      Alert.alert('Error', err.message || 'Network error while sharing collection.');
    } finally {
      setSharingCollection(false);
    }
  };

  // Get active trip details
  const activeTrip = trips.find(t => t._id === activeTripId);
  const getTripTitle = (trip) => {
    if (!trip) return 'Select Trip';
    const loc = trip.location_id || trip.location || '';
    return loc.replace('loc_', '').replace(/_/g, ' ').toUpperCase() || 'Trip';
  };
  const activeTripName = getTripTitle(activeTrip);

  const isFocused = useIsFocused();

  // Added handleRefresh implementation
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchFallbackTripId(),
        fetchGalleryData(),
        fetchCollectionsData(),
        selectedCollectionId && selectedCollectionId !== 'loose'
          ? fetchCollectionPhotosData(selectedCollectionId)
          : Promise.resolve()
      ]);
    } catch (err) {
      console.error('Refresh Error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchFallbackTripId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, passedTripId]);

  useEffect(() => {
    if (isFocused && viewMode === 'gallery' && (activeTripId || selectedTripFilters.length > 0)) {
      fetchGalleryData();
      fetchCollectionsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, viewMode, activeTripId, selectedTripFilters]);

  useEffect(() => {
    if (viewMode === 'collection-detail' && selectedCollectionId) {
      fetchCollectionPhotosData(selectedCollectionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const response = await httpService.trips.getTrips();

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
        const response = await httpService.gallery.getCollections(id);
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
        const response = await httpService.gallery.getImages(id);
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
      setCollectionPermissions({
        canView: true,
        canAdd: true,
        canEdit: true,
        canDelete: true
      });
      return;
    }

    try {
      setLoadingCollectionPhotos(true);
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await httpService.gallery.getCollection(colId);

      const json = await response.json();
      if (response.ok && json.success) {
        setCollectionPhotos(json.data?.photos || json.photos || []);
        if (json.data?.permissions) {
          setCollectionPermissions(json.data.permissions);
        } else {
          setCollectionPermissions({
            canView: true,
            canAdd: true,
            canEdit: true,
            canDelete: true
          });
        }
      } else {
        setCollectionPhotos([]);
        Alert.alert('Access Denied', json.error || 'Collection not found or access denied.');
        setViewMode('gallery');
        setSelectedCollectionId(null);
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

      const response = await httpService.gallery.createCollection({
        tripId: collectionTripId,
        name: collectionName,
        description: collectionDescription,
        accessibility: collectionAccessibility
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

      const response = await httpService.gallery.patchCollection(editingCollection._id, {
        tripId: collectionTripId,
        name: collectionName,
        description: collectionDescription,
        accessibility: collectionAccessibility
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

  const handleUpdateCollectionAccessibility = async (colId, nextAccessibility) => {
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const targetCol = collections.find(c => c._id === colId);
      if (!targetCol) return;

      const response = await httpService.gallery.patchCollection(colId, {
        tripId: targetCol.tripId || null,
        name: targetCol.name,
        description: targetCol.description || '',
        accessibility: nextAccessibility
      });

      const json = await response.json();
      if (response.ok && json.success) {
        Alert.alert("Success 🎉", `Accessibility updated to ${nextAccessibility}!`);
        await fetchCollectionsData();
        setCollections(prev => prev.map(c => c._id === colId ? { ...c, accessibility: nextAccessibility } : c));
      } else {
        throw new Error(json.message || "Failed to update collection accessibility.");
      }
    } catch (err) {
      console.error("Update Collection Accessibility Error: ", err);
      Alert.alert("Error", err.message || "Network error while updating accessibility.");
    }
  };

  const handleDeleteCollection = async (colId) => {
    try {
      const token = await authService.getAccessToken();
      if (!token) return;

      const response = await httpService.gallery.deleteCollection(colId);

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

      const response = await httpService.gallery.removeImageFromCollection(imageId);

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

      const response = await httpService.gallery.deleteImage(imageId);

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
        setPhotosList(prev => [...prev, response.assets[0]]);
      }
    });
  };

  const selectFromGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 0,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Gallery Error', `Error code: ${response.errorCode}`);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setPhotosList(prev => [...prev, ...response.assets]);
      }
    });
  };

  const removePhotoFromStaging = (indexToRemove) => {
    setPhotosList(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const uploadImage = async () => {
    if (!activeTripId) {
      Alert.alert("Error", "Cannot upload image without a valid trip ID.");
      return;
    }
    if (photosList.length === 0) {
      Alert.alert('Staging Area Empty', 'Please select or capture at least one photo first.');
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

      const uploadPromises = photosList.map(async (p) => {
        const formData = new FormData();
        const cleanUri = Platform.OS === 'android' ? p.uri : p.uri.replace('file://', '');

        formData.append('image', {
          uri: cleanUri,
          type: p.type || 'image/jpeg',
          name: p.fileName || `trip_image_${Date.now()}.jpg`,
        });

        formData.append('caption', caption);
        formData.append('accessibility', accessibility);

        if (selectedCollectionId) {
          formData.append('collectionId', selectedCollectionId);
        }

        const response = await httpService.gallery.uploadImage(activeTripId, formData);

        const rawText = await response.text();
        let json;
        try {
          json = JSON.parse(rawText);
        } catch (e) {
          throw new Error(`Server returned non-JSON response.`);
        }

        if (!response.ok || !json.success) {
          throw new Error(json.message || 'Server upload execution sequence failed');
        }
        return json;
      });

      await Promise.all(uploadPromises);

      Alert.alert('Success 🎉', `Successfully uploaded ${photosList.length} image(s) to your gallery storage!`);
      setPhotosList([]);
      setCaption('');
      fetchGalleryData();
      setViewMode('gallery');
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
    photosList,
    setPhotosList,
    takePhoto,
    selectFromGallery,
    removePhotoFromStaging,
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
    handleUpdateCollectionAccessibility,
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
    refreshing,
    handleRefresh,
    shareModalVisible,
    setShareModalVisible,
    shareIdentifier,
    setShareIdentifier,
    shareRole,
    setShareRole,
    sharingCollection,
    handleShareCollection,
    collectionPermissions,
  };
};