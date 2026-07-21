import { useState, useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import authService from '../../services/authService';


export const useImageUpload = (passedTripId) => {
  const [viewMode, setViewMode] = useState('gallery');

  // Internal state to hold fallback ID if passedTripId is missing
  const [internalTripId, setInternalTripId] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(false);

  const [loadingGallery, setLoadingGallery] = useState(false);
  const [collections, setCollections] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionAccessibility, setCollectionAccessibility] = useState('shared');
  const [creatingCollection, setCreatingCollection] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('Testing my cloud gallery upload!');
  const [accessibility, setAccessibility] = useState('shared');

  // Compute the true trip ID to use across functions safely
  const activeTripId = passedTripId || internalTripId;

  // 1. Fetch active trip from registry if no ID was provided to the hook
  useEffect(() => {
    if (!passedTripId) {
      fetchFallbackTripId();
    }
  }, [passedTripId]);

  // 2. Fetch gallery data reactively when viewMode or activeTripId updates
  useEffect(() => {
    if (viewMode === 'gallery' && activeTripId) {
      fetchGalleryData();
    }
  }, [viewMode, activeTripId]);

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

      if (response.ok && json.success && Array.isArray(json.data) && json.data.length > 0) {
        // Find the first trip that isn't 'cancelled', or fallback to the first trip object
        const validTrip = json.data.find(trip => trip.status !== 'cancelled') || json.data[0];
        
        if (validTrip && validTrip._id) {
          setInternalTripId(validTrip._id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch fallback trip ID:", err);
    } finally {
      setLoadingTrip(false);
    }
  };

  const fetchGalleryData = async () => {
    if (!activeTripId) return; 

    try {
      setLoadingGallery(true);
      const token = await authService.getAccessToken();
      if (!token) {
        Alert.alert("Error", "Session expired. Please log in again.");
        return;
      }

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/${activeTripId}`, {
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
        setCollections([]);
        setAllImages([]);
        return;
      }

      if (response.ok && json.success) {
        // Your endpoint returns the image array directly inside json.data
        if (Array.isArray(json.data)) {
          setAllImages(json.data);
          setCollections([]); // Clear or handle collections if not present in this endpoint
        } else {
          // Fallback logic for alternative endpoint formats
          setCollections(json.collections || json.data?.collections || []);
          setAllImages(json.images || json.data?.images || []);
        }
      } else {
        setCollections([]);
        setAllImages([]);
      }
    } catch (err) {
      console.error("Gallery Fetch Error: ", err);
    } finally {
      setLoadingGallery(false);
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
          tripId: activeTripId,
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

      const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/${activeTripId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('====================================');
      console.log("Uploading to Trip ID:", activeTripId);
      console.log('====================================');

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

  // Return the functions and values needed by your UI components
  return {
    viewMode,
    setViewMode,
    loadingGallery,
    loadingTrip,
    tripId: activeTripId, // Always passes back the accurate target ID to the UI
    collections,
    allImages,
    createModalVisible,
    setCreateModalVisible,
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    collectionAccessibility,
    setCollectionAccessibility,
    creatingCollection,
    handleCreateCollection,
    photo,
    takePhoto,
    uploadImage,
    uploading,
    caption,
    setCaption,
    accessibility,
    setAccessibility
  };
};
