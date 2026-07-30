import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Tokens } from '../theme/theme';

/**
 * Shared section heading row.
 * Props:
 *   title     {string}   - Section title
 *   onSeeAll  {func}     - Optional callback for the ">" button
 */
const SectionHeader = ({ title, onSeeAll }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.gaps.large,
  },
  title: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
  },
  arrow: {
    fontSize: 22,
    fontFamily: Tokens.typography.families.regular,
  },
});

export default SectionHeader;
