import { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import apiClient from '../../services/apiClient';
import { useAlertModal } from '../../components/index';

export const useProfileSettings = () => {
  const propScale = useRef(new Animated.Value(1)).current;
  const { setUserIsAuthenticated } = useContext(AuthContext);
  const { showModal } = useAlertModal();
  const navigation = useNavigation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient('/auth/profile');
      const json = await res.json();
      if (json.success && json.data) {
        setProfile(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handlePressIn = () => {
    Animated.spring(propScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(propScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    showModal({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      variant: 'warning',
      confirmText: 'Log Out',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await authService.logout();
          setUserIsAuthenticated(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpScreen' }],
          });
        }  catch (error) {
          console.log(error);
        }
      }
    });
  };

  return {
    propScale,
    profile,
    loading,
    fetchProfile,
    handlePressIn,
    handlePressOut,
    handleLogout
  };
};
