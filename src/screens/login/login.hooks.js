import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';
import { AuthContext } from '../../context';
import { useAlertModal } from '../../components';
import { authService, httpService } from '../../services';
import { saveTokens } from '../../utils';

export const useLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUserIsAuthenticated } = useContext(AuthContext);
  const { authorize } = useAuth0();
  const navigation = useNavigation();
  const { showModal } = useAlertModal();

  const BACKEND_URL = 'https://trackmate-x7ue.onrender.com';

  const openSignUpDisplay = () => {
    if (navigation) {
      navigation.replace('Signup');
    }
  };

  

  const handleAuth0Login = async (connection = null) => {
    setLoading(true);
    try {
      const authOptions = {
        scope: 'openid profile email offline_access',
        audience: BACKEND_URL
      };
      if (connection) {
        authOptions.connection = connection;
      }
      const credentials = await authorize(authOptions);

      const tokenToSend = credentials?.accessToken || credentials?.idToken;

      if (!tokenToSend) {
        throw new Error("No authentication context issued from authorization layer.");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await httpService.auth.syncAuth0User(tokenToSend, controller.signal);
      
      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Backend synchronization failed.');

      await saveTokens(data.accessToken, data.refreshToken, data.userId);
      
      setUserIsAuthenticated(true);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown integration error';
      console.error("Authentication interaction aborted:", errorMessage);
      
      showModal({
        title: 'Login Failed',
        message: errorMessage,
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };



  const handleLogin = async () => {
    const userInput = emailOrPhone.trim(); 
    const cleanPassword = password.trim();

    if (!userInput || !cleanPassword) {
      showModal({
        title: 'Validation Error',
        message: 'Please fill in all fields.',
        variant: 'error'
      });
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        identifier: userInput,
        password: cleanPassword,
      }; 

      const data = await authService.login(payload);
      setLoading(false);

      showModal({
        title: 'Success',
        message: 'Logged in successfully!',
        variant: 'success',
        confirmText: 'OK',
        onConfirm: () => {
          setUserIsAuthenticated(true); 
        }
      });
      
    } catch (error) {
      setLoading(false);
      const isNetworkIssue = 
        error.message?.toLowerCase().includes('network') || 
        error.message?.toLowerCase().includes('timeout') ||
        error.message?.toLowerCase().includes('failed to fetch');

      showModal({
        title: isNetworkIssue ? 'Connection Error' : 'Login Failed',
        message: isNetworkIssue 
          ? 'Please check your internet connection and try again.' 
          : (error.message || 'Invalid credentials.'), 
        variant: 'error',
        confirmText: isNetworkIssue ? 'Try Again' : 'OK'
      });
    }
  };

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    loading,
    openSignUpDisplay,
    handleAuth0Login,
    handleLogin
  };
};