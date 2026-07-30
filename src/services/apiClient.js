import authService from './authService';

const BASE_URL = 'https://trackmate-x7ue.onrender.com';

const apiClient = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  
  let accessToken = await authService.getAccessToken();

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const config = {
    ...options,
    headers,
  };

  let response = await fetch(url, config);

  if (response.status === 401) {
    console.log("apiClient: 401 Unauthorized detected. Attempting token refresh...");
    try {
      const newToken = await authService.refreshAccessToken();
      if (newToken) {
        // Retry the original request with the new token
        headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(url, { ...config, headers });
      }
    } catch (error) {
      console.log("apiClient: Token refresh failed. User logged out.");
      await authService.logout();
    }
  }

  return response;
};

export default apiClient;
