import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Tokens } from '../../../theme/theme';

/**
 * Horizontal scrollable category filter chips.
 * Props:
 *   categories     {string[]} - Array of category strings (e.g. ['All', 'Asia', ...])
 *   activeCategory {string}   - Currently selected category
 *   onSelect       {func}     - Called with category string when chip tapped
 */
const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
    >
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            style={[
              styles.chip,
              isActive
                ? styles.chipActive
                : [
                    styles.chipInactive,
                    {
                      borderColor: isDarkMode
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.15)',
                    },
                  ],
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                isActive
                  ? styles.chipTextActive
                  : { color: colors.textSecondary },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginBottom: Tokens.gaps.large,
  },
  scrollContent: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    gap: Tokens.gaps.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#FF6B35',
  },
  chipInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  chipText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
  },
});

export default CategoryFilter;
