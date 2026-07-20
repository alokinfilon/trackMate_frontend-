import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Buffer } from 'buffer';

import { saveTokens, getTokens, clearTokens } from '../utils/storage';

const safeStorage = {
  getItem: async (key) => {
    try {
      const tokens = await getTokens();
      return tokens ? tokens[key] : null;
    } catch (err) {
      console.error(`Error reading key ${key}:`, err);
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      if (value === undefined || value === null) return;
      const tokens = await getTokens() || {};
      tokens[key] = value;
      await saveTokens(tokens.accessToken, tokens.refreshToken, tokens.userId);
    } catch (err) {
      console.error(`Error saving key ${key}:`, err);
    }
  },
  removeItem: async (key) => {
    try {
      const tokens = await getTokens();
      if (tokens) {
        delete tokens[key];
        await saveTokens(tokens.accessToken, tokens.refreshToken, tokens.userId);
      }
    } catch (err) {
      console.error(`Error deleting key ${key}:`, err);
    }
  }
};

const BASE_URL = 'https://trackmate-x7ue.onrender.com'; 

const authService = {
  
  async signup(identifier, password, confirmPassword) {
    let fcmToken = null;

    // ✅ FIXED: Targeted standard endpoint naming and extracted data.error payload key correctly
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password, confirmPassword, fcmToken }) 
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');
    return data;
  },

  async login(payload) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) 
    });
    
    if (!response.ok) {
      try {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      } catch (jsonErr) {
        const errorText = await response.text();
        console.log("Server Plain-Text Error Response:", errorText);
        throw new Error(errorText || 'Login failed');
      }
    }
    
    const data = await response.json();
    
    if (data.accessToken && data.userId) {
      await safeStorage.setItem('accessToken', data.accessToken);
      await safeStorage.setItem('refreshToken', data.refreshToken);
      await safeStorage.setItem('userId', data.userId);
      console.log("Tokens securely cached on local disk storage!");
    }
    
    return data; 
  },

  async logout() {
    await clearTokens();
    console.log("User session cleared completely.");
  },

  async isAuthenticated() {
    const token = await safeStorage.getItem('accessToken');
    return token !== null && token !== undefined && token !== ''; 
  },

  isTokenExpired(token) {
    try {
      if (!token) return true;
      const parts = token.split('.');
      if (parts.length !== 3) return true; 
      
      const payloadDecoded = Buffer.from(parts[1], 'base64').toString('utf8');
      const payload = JSON.parse(payloadDecoded);
      
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp < (currentTime + 30);
    } catch (error) {
      console.error("Failed to accurately read token lifespan metrics:", error);
      return true; 
    }
  },

  async refreshAccessToken() {
    try {
      const savedRefreshToken = await safeStorage.getItem('refreshToken');
      if (!savedRefreshToken) throw new Error("No refresh token available");

      console.log("Attempting to renew expired access token session...");

      const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: savedRefreshToken }) 
      });

      if (!response.ok) {
        await this.logout();
        throw new Error("Session expired. Please log in again.");
      }

      const data = await response.json();
      
      if (data.accessToken) {
        await safeStorage.setItem('accessToken', data.accessToken);
        await safeStorage.setItem('refreshToken', data.refreshToken);
        await safeStorage.setItem('userId', data.userId);
        
        console.log("Tokens rotated and user session renewed automatically!");
        return data.accessToken;
      }
    } catch (error) {
      console.error("Token renewal execution failed:", error.message);
      await this.logout();
      throw error;
    }
  },

  async getAccessToken() {
    const token = await safeStorage.getItem('accessToken');
    
    if (!token || token === '') {
      console.log("No token found in device memory. Redirecting to clean logout state...");
      await this.logout();
      return null;
    }

    if (this.isTokenExpired(token)) {
      console.log("Stale token detected. Initiating immediate automated token rotation...");
      try {
        return await this.refreshAccessToken();
      } catch (refreshError) {
        console.error("Automated token renewal loop collapsed. Evicting user context.");
        await this.logout();
        return null;
      }
    }

    return token;
  },

  async getUserId() {
    return await safeStorage.getItem('userId');
  }
};

export default authService;