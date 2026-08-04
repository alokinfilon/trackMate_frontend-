import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context';
import { useNotification } from './notification.hooks';
import { createStyles } from './notification.styles';
import { strings } from './notification.strings';

import { Arrow } from '../../../../components';

export default function NotificationScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    loading,
    allEnabled, setAllEnabled,
    trips, setTrips,
    promos, setPromos,
    reminders, setReminders,
  } = useNotification();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }]} edges={['top']}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{strings.headerTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ── Master toggle ── */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          General
        </Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={22} color={colors.primary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>All Notifications</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>
                  Master switch for all push notifications
                </Text>
              </View>
            </View>
            <Switch
              value={allEnabled}
              onValueChange={setAllEnabled}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </View>

        {/* ── Per-type toggles ── */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.pushTitle}</Text>

        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="airplane-outline" size={22} color={allEnabled ? colors.primary : colors.textTertiary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: allEnabled ? colors.textPrimary : colors.textTertiary }]}>{strings.tripLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.tripDesc}</Text>
              </View>
            </View>
            <Switch
              value={allEnabled && trips}
              onValueChange={setTrips}
              disabled={!allEnabled}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="gift-outline" size={22} color={allEnabled ? colors.primary : colors.textTertiary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: allEnabled ? colors.textPrimary : colors.textTertiary }]}>{strings.promoLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.promoDesc}</Text>
              </View>
            </View>
            <Switch
              value={allEnabled && promos}
              onValueChange={setPromos}
              disabled={!allEnabled}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="alarm-outline" size={22} color={allEnabled ? colors.primary : colors.textTertiary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: allEnabled ? colors.textPrimary : colors.textTertiary }]}>{strings.reminderLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.reminderDesc}</Text>
              </View>
            </View>
            <Switch
              value={allEnabled && reminders}
              onValueChange={setReminders}
              disabled={!allEnabled}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
