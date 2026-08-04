import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context';
import { useAppearance } from './appearance.hooks';
import { createStyles } from './appearance.styles';
import { strings } from './appearance.strings';

import { Arrow } from '../../../../components';

export default function AppearanceScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const { toggleTheme } = useAppearance();

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
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.themeTitle}</Text>

        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}
            onPress={() => toggleTheme('light')}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="sunny-outline" size={22} color={colors.primary} style={styles.icon} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.lightTheme}</Text>
            </View>
            {!isDarkMode && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => toggleTheme('dark')}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="moon-outline" size={22} color={colors.primary} style={styles.icon} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.darkTheme}</Text>
            </View>
            {isDarkMode && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
