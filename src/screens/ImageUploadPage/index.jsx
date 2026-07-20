import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  Alert,
  SafeAreaView,
  TextInput,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import authService from '../../services/authService'; 

export default function ImageUploadPage() {
  const [photo, setPhoto] = useState(null); 
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('Testing my cloud gallery upload!');
  const [accessibility, setAccessibility] = useState('shared');

  const targetTripId = "6a59eacf20a014ca5f258047"; 

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
  if (response.didCancel) {
    console.log('User cancelled camera picker context');
    return;
  }

  if (response.errorCode) {
    Alert.alert('Camera Error', `Error code: ${response.errorCode}`);
    return;
  }

  if (response.assets && response.assets.length > 0) {
    // 💡 FIX HERE: Store ONLY the single object item map directly into the state
    setPhoto(response.assets[0]); 
    console.log("📸 Image successfully captured and stored:", response.assets[0].uri);
  }
});

  };

  const uploadImage = async () => {
  // 1. FIXED: Verify the photo object and its properties exist directly
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
    
    // 2. FIXED: Read properties directly from 'photo' since it is already an object
    const cleanUri = Platform.OS === 'android' 
      ? photo.uri 
      : photo.uri.replace('file://', '');

    // 3. FIXED: Passed 'photo' properties directly into the form data structure
    formData.append('image', {
      uri: cleanUri,
      type: photo.type || 'image/jpeg', 
      name: photo.fileName || `trip_image_${Date.now()}.jpg`,
    });

    formData.append('caption', caption);
    formData.append('accessibility', accessibility);

    console.log("🚀 Dispatched payload overview:", JSON.stringify({
      uri: cleanUri,
      type: photo.type,
      name: photo.fileName
    }));

    const response = await fetch(`https://trackmate-x7ue.onrender.com/api/gallery/6a59eaff20a014ca5f258048`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const rawText = await response.text();
    console.log("Raw Server Response Text:", rawText);

    let json;
    try {
      json = JSON.parse(rawText);
    } catch (e) {
      throw new Error(`Server returned non-JSON code response.`);
    }

    if (response.ok && json.success) {
      Alert.alert('Success 🎉', 'Image uploaded into your gallery storage!');
      setPhoto(null); 
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Upload Trip Media Asset</Text>
        
        <View style={styles.imagePreviewContainer}>
  {photo ? (
    <Image source={{ uri: photo.uri }} style={styles.previewImage} />
  ) : (
    <Text style={styles.placeholderText}>No image captured yet</Text>
  )}
</View>


        <TextInput 
          style={styles.textInput}
          placeholder="Caption"
          value={caption}
          onChangeText={setCaption}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Accessibility (shared / private)"
          value={accessibility}
          onChangeText={setAccessibility}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>📸 Open Device Camera</Text>
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity 
            style={[styles.uploadButton, uploading && styles.disabledButton]} 
            onPress={uploadImage}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>📤 Send to Trip Gallery</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#222222', marginBottom: 15 },
  imagePreviewContainer: { width: '100%', height: 220, backgroundColor: '#EAECEF', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#D0D4DC', overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderText: { color: '#7A869A', fontSize: 14 },
  textInput: { width: '100%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 14, color: '#333' },
  primaryButton: { backgroundColor: '#4D96FF', width: '100%', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  uploadButton: { backgroundColor: '#6BCB77', width: '100%', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: '#A5D6A7' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' }
});
