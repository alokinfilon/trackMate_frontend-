import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../context';
import { Tokens } from '../../../theme';
import { SectionHeader } from '../../../components';

const POPULAR_CATEGORIES = [
  {
    id: 'beaches',
    label: 'Beaches',
    image: { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200' },
  },
  {
    id: 'museum',
    label: 'Museum',
    image: { uri: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=200' },
  },
  {
    id: 'cruises',
    label: 'Cruises',
    image: { uri: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=200' },
  },
  {
    id: 'forest',
    label: 'Forest',
    image: { uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200' },
  },
  {
    id: 'mountains',
    label: 'Mountains',
    image: { uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200' },
  },
];

const CIRCLE_SIZE = 80;

/**
 * Popular Categories horizontal scroll section.
 * Props:
 *   onCategoryPress {func} - Optional tap handler
 */
const PopularCategoriesSection = ({ onCategoryPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <SectionHeader title="Popular Categories" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {POPULAR_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryItem}
            onPress={() => onCategoryPress && onCategoryPress(cat)}
            activeOpacity={0.75}
          >
            <Image source={cat.image} style={styles.circle} />
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Tokens.gaps.xlarge,
    marginBottom: Tokens.gaps.large,
  },
  scrollContent: {
    paddingRight: Tokens.layout.paddingHorizontal,
    gap: Tokens.gaps.large,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  label: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13,
    textAlign: 'center',
  },
});

export default PopularCategoriesSection;
