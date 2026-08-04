import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFS_KEY = '@trackmate_notif_prefs';

const DEFAULT_PREFS = {
  allEnabled: true,
  trips: true,
  promos: false,
  reminders: true,
};

async function loadPrefs() {
  try {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

async function savePrefs(prefs) {
  try {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.warn('[NotifPrefs] save error:', err.message);
  }
}

export const useNotification = () => {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);

  // Load persisted prefs on mount
  useEffect(() => {
    loadPrefs().then(p => {
      setPrefs(p);
      setLoading(false);
    });
  }, []);

  const updatePref = useCallback((key, value) => {
    setPrefs(prev => {
      const updated = { ...prev, [key]: value };
      savePrefs(updated);
      return updated;
    });
  }, []);

  return {
    loading,
    allEnabled: prefs.allEnabled,
    setAllEnabled: v => updatePref('allEnabled', v),
    trips: prefs.trips,
    setTrips: v => updatePref('trips', v),
    promos: prefs.promos,
    setPromos: v => updatePref('promos', v),
    reminders: prefs.reminders,
    setReminders: v => updatePref('reminders', v),
  };
};
