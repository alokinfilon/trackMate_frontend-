import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../../context';
import { Tokens } from '../../../theme';
import { BellIcon, AccountIcon } from '../../../components';
import { useNavigation } from '@react-navigation/native';

/**
 * Home screen top navigation bar.
 * Left: Profile Avatar (falls back to AccountIcon if no userImage) | Center: TrackMate title | Right: BellIcon with badge
 */
const HomeHeader = ({ userImage, unreadCount, onBellPress }) => {
  const { colors, isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Avatar (Left) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('setting')}
        style={[
          styles.profileBtn,
          { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#F3F4F6' }
        ]}
      >
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.profileImage} />
        ) : (
          <AccountIcon stroke={colors.textPrimary} width={22} height={22} />
        )}
      </TouchableOpacity>

      {/* App Title (Center) */}
      <Text style={[styles.title, { color: colors.textPrimary }]}>TrackMate</Text>

      {/* Bell Notification Button (Right) */}
      <TouchableOpacity
        style={[styles.bellButton, { backgroundColor: colors.surface }]}
        onPress={onBellPress}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <BellIcon size={22} color={colors.textPrimary} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
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
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
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
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: Tokens.typography.families.semiBold,
    lineHeight: 12,
  },
});

export default HomeHeader;
