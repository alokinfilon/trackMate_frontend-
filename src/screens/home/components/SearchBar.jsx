import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context';
import { Tokens } from '../../../theme';

import { ExploreIcon } from '../../../components';

/**
 * Search bar for the home screen.
 * Props:
 *   value        {string}   - Current search text in input
 *   onChangeText {function} - Called on text change
 *   onSubmit     {function} - Called to execute search query
 */
const SearchBar = ({ value, onChangeText, onSubmit }) => {
  const { colors, isDarkMode } = useTheme();

  const bgColor = isDarkMode ? '#242444' : '#F0F0F5';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity activeOpacity={0.7} onPress={onSubmit}>
        <ExploreIcon color={colors.textSecondary} size={18} />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search destinations..."
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.textPrimary }]}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
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
