import { useRef, useContext, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context';
import { authService } from '../../services';
import { useAlertModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchProfile,
  selectProfile,
  selectProfileLoading,
} from '../../store/slices';

export const useProfileSettings = () => {
  const propScale = useRef(new Animated.Value(1)).current;
  const { setUserIsAuthenticated } = useContext(AuthContext);
  const { showModal } = useAlertModal();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Read from Redux cache — no duplicate /auth/profile request
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectProfileLoading);

  useEffect(() => {
    // Will use TTL cache — skips network if fetched within last 5 minutes
    dispatch(fetchProfile());
  }, [dispatch]);

  const fetchProfileRefresh = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return {
    propScale,
    profile,
    loading,
    fetchProfile: fetchProfileRefresh,
    handlePressIn,
    handlePressOut,
    handleLogout,
  };
};
