import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Tokens } from '../../../theme/theme';

const FALLBACK_IMAGE = require('./images/image.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - Tokens.layout.paddingHorizontal * 2;
const CARD_HEIGHT = CARD_WIDTH * 0.88; // taller card

const THUMB_SIZE = 40;
const THUMB_BORDER_RADIUS = 9;


const PlaceCard = ({ item, onPress }) => {
  const [imageError, setImageError] = useState(false);
  const heroImage = item.heroImage || (item.images && item.images[0]);
  const extraImages = (item.images || []).slice(1, 3);   // up to 2 thumbnails
  const extraCount = Math.max(0, (item.images || []).length - 3); // "+N"

  const amenities = item.amenities
    ? Object.entries(item.amenities)
      .filter(([, v]) => v === true || v === 'yes')
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
      .slice(0, 3)
    : [];

  const chips = amenities.length > 0
    ? amenities
    : item.category
      ? [item.category]
      : [];

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => onPress && onPress(item));

  const subtitle =
    item.geography?.region ||
    item.geography?.district ||
    item.logistics?.nearest_city ||
    null;

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={styles.card}>
        {/* ── Full-bleed hero image ── */}
        <Image
          source={heroImage && !imageError ? { uri: heroImage } : FALLBACK_IMAGE}
          defaultSource={FALLBACK_IMAGE}
          onError={() => setImageError(true)}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* ── Bottom gradient overlay ── */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.75)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        {/* ── Thumbnail strip — top right ── */}
        {extraImages.length > 0 && (
          <View style={styles.thumbStrip}>
            {extraImages.map((uri, i) => (
              <View key={i} style={styles.thumbWrapper}>
                <Image source={{ uri }} style={styles.thumb} resizeMode="cover" />
              </View>
            ))}
            {extraCount > 0 && (
              <View style={styles.extraCountBadge}>
                <Text style={styles.extraCountText}>+{extraCount}</Text>
              </View>
            )}
          </View>
        )}

        {/* ── Bottom content overlay ── */}
        <View style={styles.bottomOverlay}>
          {/* Text block */}
          <View style={styles.textBlock}>
            {/* Title */}
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>

            {/* Region subtitle */}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}

            {/* Chips */}
            {chips.length > 0 && (
              <View style={styles.chipsRow}>
                {chips.map((chip) => (
                  <View key={chip} style={styles.chip}>
                    <Text style={styles.chipText}>{chip}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Heart button */}
          <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: Tokens.gaps.large,
    backgroundColor: '#1A1A2E',
    // Drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },

  // ── Image ──────────────────────────────────────────────────────────
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    backgroundColor: '#2D3748',
  },

  // ── Gradient ───────────────────────────────────────────────────────
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },

  // ── Thumbnail strip ────────────────────────────────────────────────
  thumbStrip: {
    position: 'absolute',
    top: 14,
    right: 14,
    gap: 6,
    alignItems: 'center',
  },
  thumbWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_BORDER_RADIUS,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
  },
  extraCountBadge: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_BORDER_RADIUS,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  extraCountText: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 15,
  },

  // ── Bottom content row ─────────────────────────────────────────────
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    marginRight: 12,
    gap: 4,
  },
  title: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chipText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#FFFFFF',
  },

  // ── Heart button ───────────────────────────────────────────────────
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heartIcon: {
    fontSize: 18,
    color: '#333',
  },
});

export default PlaceCard;
