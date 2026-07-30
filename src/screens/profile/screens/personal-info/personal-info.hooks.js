import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import apiClient from '../../../../services/apiClient';

export const usePersonalInfo = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient('/auth/profile');
      const json = await res.json();
      if (json.success && json.data) {
        setName(json.data.full_name || '');
        setEmail(json.data.email || '');
        setPhone(json.data.mobile || '');
        setLocation(json.data.country || '');
        setUserImage(json.data.user_image || null);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      Alert.alert('Error', 'Could not load your profile details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to select image');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setSelectedPhoto(response.assets[0]);
      }
    });
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Full Name cannot be empty.');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('full_name', name);
      formData.append('country', location);

      if (selectedPhoto) {
        const cleanUri = Platform.OS === 'android' ? selectedPhoto.uri : selectedPhoto.uri.replace('file://', '');
        formData.append('image', {
          uri: cleanUri,
          type: selectedPhoto.type || 'image/jpeg',
          name: selectedPhoto.fileName || `profile_${Date.now()}.jpg`,
        });
      }

      const res = await apiClient('/auth/profile', {
        method: 'PUT',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        throw new Error(json.message || 'Failed to save changes.');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      Alert.alert('Error', err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    name,
    setName,
    email,
    phone,
    location,
    setLocation,
    userImage,
    selectedPhoto,
    selectImage,
    handleSave,
  };
};
