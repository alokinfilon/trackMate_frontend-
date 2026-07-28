import { useState, useRef, useContext } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import { useAlertModal } from '../../components/index';

export const useProfileSettings = () => {
  const propScale = useRef(new Animated.Value(1)).current;
  const { setUserIsAuthenticated } = useContext(AuthContext);
  const { showModal } = useAlertModal();
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const navigation = useNavigation();

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
    themeModalVisible,
    setThemeModalVisible,
    handlePressIn,
    handlePressOut,
    handleLogout
  };
};
