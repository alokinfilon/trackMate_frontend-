import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Tokens } from '../../../theme/theme';

/**
 * Search bar for the home screen.
 * Props:
 *   value       {string}  - Current search query
 *   onChangeText {func}  - Called on text change
 */
const SearchBar = ({ value, onChangeText }) => {
  const { colors, isDarkMode } = useTheme();

  const bgColor = isDarkMode ? '#242444' : '#F0F0F5';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search destinations..."
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.textPrimary }]}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Tokens.layout.paddingHorizontal,
    marginBottom: Tokens.gaps.large,
    borderRadius: 999,
    paddingHorizontal: Tokens.gaps.large,
    paddingVertical: 12,
    gap: Tokens.gaps.small,
  },
  icon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    padding: 0,
    margin: 0,
  },
});

export default SearchBar;
