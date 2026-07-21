import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';
import { useAlertModal } from '../../components/index';
import authService from '../../services/authService';
import { saveTokens } from '../../utils/storage';
import { AuthContext } from '../../context/AuthContext'; 


export const useSignup = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  
  const { setUserIsAuthenticated } = useContext(AuthContext);
  
  const navigation = useNavigation();
  const { showModal } = useAlertModal();
  const { authorize } = useAuth0();

  const openLoginDisplay = () => {
    if (navigation) {
      navigation.replace('Login');
    }
  };
  
  const BACKEND_URL = 'https://trackmate-x7ue.onrender.com';

  const hasMinLength = password.length >= 8;
  const hasCaseLetters = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecialChar = /[#@$%&!*_?^]/.test(password);
  const hasNumber = /\d/.test(password);

  const strengthScore = [
    hasMinLength,
    hasCaseLetters,
    hasSpecialChar,
    hasNumber,
  ].filter(Boolean).length;

  const handleSignUp = async () => {
    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (!cleanIdentifier || !cleanPassword || !cleanConfirmPassword) {
      showModal({
        title: 'Validation Error',
        message: 'Please fill in all fields.',
        variant: 'error',
      });
      return;
    }

    if (strengthScore < 4) {
      let missingRequirements = [];
      if (!hasMinLength) missingRequirements.push('At least 8 characters');
      if (!hasCaseLetters) missingRequirements.push('Capital and lowercase letters');
      if (!hasSpecialChar) missingRequirements.push('A special character (#@$%&!*_?^)');
      if (!hasNumber) missingRequirements.push('A number');

      showModal({
        title: 'Weak Password',
        message: `Your password must satisfy all security requirements:\n\n• ${missingRequirements.join('\n• ')}`,
        variant: 'error',
      });
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      showModal({
        title: 'Password Mismatch',
        message: 'Passwords do not match.',
        variant: 'error',
      });
      return;
    }

    if (!termsAccepted) {
      showModal({
        title: 'Consent Required',
        message: 'You must accept the terms and privacy consent.',
        variant: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await authService.signup(cleanIdentifier, cleanPassword, cleanConfirmPassword);

      showModal({
        title: 'Account Created',
        message: 'Your account has been created successfully!',
        variant: 'success',
        confirmText: 'Continue',
        onConfirm: openLoginDisplay,
      });
    } catch (error) {
      showModal({
        title: 'Signup Failed',
        message: error.message || 'Something went wrong. Please try again later.',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  let strengthLabel = 'Very Weak';
  let activeBarColor = '#F16646';

  if (password.length === 0) {
    strengthLabel = 'Empty';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 1) {
    strengthLabel = 'Weak';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 2) {
    strengthLabel = 'Fair';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 3) {
    strengthLabel = 'Good';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 4) {
    strengthLabel = 'Strong';
    activeBarColor = '#2BBA52';
  }

  const isPasswordMatched = password.length > 0 && password === confirmPassword;

  const handleAuth0Signup = async (connection = null) => {
    setLoading(true);
    try {
      // 1. Trigger Auth0 Signup Screen
      const authOptions = {
        scope: 'openid profile email offline_access',
        audience: 'https://trackmate-x7ue.onrender.com', 
        screenHint: 'signup' 
      };
      if (connection) {
        authOptions.connection = connection;
      }
      const credentials = await authorize(authOptions);

      const tokenToSend = credentials?.accessToken || credentials?.idToken;

      if (!tokenToSend) {
        throw new Error("No authentication context issued from authorization layer.");
      }

      // 2. Synchronize token payload down to local Express server (with 60s timeout for Render cold start)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`${BACKEND_URL}/auth/auth0-sync`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToSend}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Backend synchronization failed.');

      // 3. Save native ecosystem sessions securely
      await saveTokens(data.accessToken, data.refreshToken, data.userId);
      
      showModal({
        title: 'Success',
        message: 'Account created and synchronized successfully!',
        variant: 'success',
        confirmText: 'Continue',
        onConfirm: () => setUserIsAuthenticated(true)
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown integration error';
      console.error("Authentication integration aborted:", errorMessage);
      
      showModal({
        title: 'Registration Failed',
        message: errorMessage,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    termsAccepted,
    setTermsAccepted,
    openLoginDisplay,
    hasMinLength,
    hasCaseLetters,
    hasSpecialChar,
    hasNumber,
    strengthScore,
    handleSignUp,
    strengthLabel,
    activeBarColor,
    isPasswordMatched,
    handleAuth0Signup
  };
};