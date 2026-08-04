import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StatusBar,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotificationsScreen, getTypeMeta, formatTimestamp } from './notifications.hooks';
import Sliders from '../../components/svg/slidersIcons';
import { Bell } from 'lucide-react-native';
import { Arrow } from '../../components';

// ── Notification Row ─────────────────────────────────────────────────────────
function NotificationRow({ item, styles, onPress, onAccept, onDecline, colors, isDarkMode }) {
  const meta = getTypeMeta(item.type);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(item)}
      style={[
        styles.rowContainer,
        !item.isRead && { backgroundColor: isDarkMode ? 'rgba(255, 107, 53, 0.05)' : 'rgba(255, 107, 53, 0.03)' }
      ]}
    >
      <View style={styles.rowLeftSection}>
        {/* Unread indicator dot */}
        {!item.isRead ? (
          <View style={styles.unreadDot} />
        ) : (
          <View style={styles.unreadPlaceholder} />
        )}

        {/* User avatar or fallback */}
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <>
              <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
              {/* Small floating activity icon */}
              {meta.icon && (
                <View style={styles.typeBadge}>
                  <meta.icon size={11} color={meta.color || colors.textPrimary} strokeWidth={2.5} />
                </View>
              )}
            </>
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: meta.bg || 'rgba(0,0,0,0.05)', borderWidth: 0 }]}>
              {meta.icon && React.createElement(meta.icon, {
                color: meta.color || colors.textPrimary,
                size: 24,
                strokeWidth: 2,
              })}
            </View>
          )}
        </View>

        {/* Content text */}
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            <Text style={styles.boldName}>{item.title} </Text>
            {item.body}
          </Text>
          <Text style={styles.subtitleTextRow}>
            {item.subtitle ? `${item.subtitle} • ` : ''}
            {formatTimestamp(item.timestamp)}
          </Text>

          {item.type === 'collection_invite' && (
            item.state !== 'actioned' ? (
              <View style={styles.inviteButtonsContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onAccept && onAccept(item.id)}
                  style={[styles.actionButton, styles.acceptButton]}
                >
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onDecline && onDecline(item.id)}
                  style={[styles.actionButton, styles.declineButton]}
                >
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.actionedText}>
                {item.shareStatus === 'accepted' ? 'Accepted' : item.shareStatus === 'declined' || item.shareStatus === 'rejected' ? 'Declined' : 'Responded'}
              </Text>
            )
          )}
        </View>
      </View>

      {/* Optional right thumbnail preview */}
      {item.thumbnail && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.previewImage} />
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ styles }) {
  return (
    <View style={styles.emptyWrap}>
      <Bell size={48} color="#08b8f3" style={{ marginBottom: 12 }} />
      <Text style={styles.emptyTitle}>No notifications yet</Text>
      <Text style={styles.emptySubtitle}>
        We'll let you know when updates or shared activities appear here.
      </Text>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────
export default function NotificationsScreen({ navigation }) {
  const {
    colors,
    isDarkMode,
    styles,
    sections,
    unreadCount,
    handleRowPress,
    refreshNotifications,
    acceptInvite,
    declineInvite,
  } = useNotificationsScreen();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshNotifications();
    setRefreshing(false);
  };

  const totalCount = sections.reduce((acc, s) => acc + s.data.length, 0);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]}
      edges={['top']}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Mockup styled Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Arrow color={colors.textPrimary} size={20} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          {/* Settings slider filter button on the right */}
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.7}
          >
            <Sliders stroke={isDarkMode ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitleText}>
          You have <Text style={styles.subtitleHighlight}>{unreadCount} Notifications</Text> today.
        </Text>
      </View>

      {/* List */}
      {totalCount === 0 ? (
        <EmptyState styles={styles} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotificationRow
              item={item}
              styles={styles}
              onPress={handleRowPress}
              onAccept={acceptInvite}
              onDecline={declineInvite}
              colors={colors}
              isDarkMode={isDarkMode}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#08b8f3"
              colors={['#08b8f3']}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
