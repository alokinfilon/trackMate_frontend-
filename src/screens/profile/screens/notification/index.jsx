import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context/ThemeContext';
import { useNotification } from './notification.hooks';
import { createStyles } from './notification.styles';
import { strings } from './notification.strings';

export default function NotificationScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    trips,
    setTrips,
    promos,
    setPromos,
    reminders,
    setReminders,
  } = useNotification();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{strings.headerTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.pushTitle}</Text>

        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="airplane-outline" size={22} color={colors.primary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.tripLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.tripDesc}</Text>
              </View>
            </View>
            <Switch
              value={trips}
              onValueChange={setTrips}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="gift-outline" size={22} color={colors.primary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.promoLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.promoDesc}</Text>
              </View>
            </View>
            <Switch
              value={promos}
              onValueChange={setPromos}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="alarm-outline" size={22} color={colors.primary} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.reminderLabel}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{strings.reminderDesc}</Text>
              </View>
            </View>
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
