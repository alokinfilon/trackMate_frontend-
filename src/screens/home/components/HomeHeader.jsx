import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Tokens } from '../../../theme/theme';

/**
 * Home screen top navigation bar.
 * Left: orange square app icon | Center: app name | Right: bell icon
 */
const HomeHeader = ({ onBellPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* App icon */}
      <View style={styles.appIconSquare}>
        <Text style={styles.appIconEmoji}>📍</Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: colors.textPrimary }]}>TrackMate</Text>

      {/* Bell */}
      <TouchableOpacity
        style={[styles.bellButton, { backgroundColor: colors.surface }]}
        onPress={onBellPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.bellIcon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingVertical: Tokens.gaps.large,
  },
  appIconSquare: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIconEmoji: {
    fontSize: 22,
  },
  title: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 22,
    letterSpacing: -0.3,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 20,
  },
});

export default HomeHeader;
