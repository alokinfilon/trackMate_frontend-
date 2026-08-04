import { useMemo, useCallback, useEffect } from 'react';
import { useTheme, useNotifications } from '../../context';
import { createStyles } from './notifications.styles';
import { useIsFocused } from '@react-navigation/native';
import { Heart, MessageSquare, UserPlus, Plane, Image, FolderOpen, Clock, Bell } from 'lucide-react-native';

// ── Icon + colour per notification type ─────────────────────────────────────
const TYPE_META = {
  like:             { icon: Heart,         color: '#EF4444', emoji: '❤️',  bg: 'rgba(239,68,68,0.1)' },
  comment:          { icon: MessageSquare, color: '#3B82F6', emoji: '💬',  bg: 'rgba(59,130,246,0.1)' },
  follow:           { icon: UserPlus,      color: '#8B5CF6', emoji: '👥',  bg: 'rgba(139,92,246,0.1)' },
  trip_share:       { icon: Plane,         color: '#6366F1', emoji: '✈️',  bg: 'rgba(99,102,241,0.1)' },
  photo_upload:     { icon: Image,         color: '#F59E0B', emoji: '📸',  bg: 'rgba(245,158,11,0.1)' },
  collection_share: { icon: FolderOpen,    color: '#10B981', emoji: '🗂️', bg: 'rgba(16,185,129,0.1)' },
  reminder:         { icon: Clock,         color: '#EF4444', emoji: '⏰',  bg: 'rgba(239,68,68,0.1)'  },
  system:           { icon: Bell,          color: '#08B8F3', emoji: '🔔',  bg: 'rgba(8,184,243,0.1)'  },
};

export function getTypeMeta(type) {
  return TYPE_META[type] || TYPE_META.system;
}

// ── Time formatting ──────────────────────────────────────────────────────────
export function formatTimestamp(ts) {
  const now = Date.now();
  const diff = now - ts;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins} m ago`;
  if (hours < 24) return `${hours} h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7)   return `${days} days ago`;

  return new Date(ts).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  });
}


// ── Section grouping ─────────────────────────────────────────────────────────
export function groupByDate(notifications) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = today.getTime();
  const oneWeekAgoTs = todayTs - 7 * 24 * 60 * 60 * 1000;

  const groups = {
    Today: [],
    'This Week': [],
    Earlier: [],
  };

  for (const n of notifications) {
    if (n.timestamp >= todayTs) {
      groups.Today.push(n);
    } else if (n.timestamp >= oneWeekAgoTs) {
      groups['This Week'].push(n);
    } else {
      groups.Earlier.push(n);
    }
  }

  const sections = [];
  if (groups.Today.length > 0) sections.push({ title: 'Today', data: groups.Today });
  if (groups['This Week'].length > 0) sections.push({ title: 'This Week', data: groups['This Week'] });
  if (groups.Earlier.length > 0) sections.push({ title: 'Earlier', data: groups.Earlier });
  return sections;
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useNotificationsScreen() {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    notifications: realNotifications,
    markAsRead,
    markAllRead,
    removeNotification,
    refreshNotifications,
    acceptInvite,
    declineInvite,
  } = useNotifications();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refreshNotifications();
    }
  }, [isFocused, refreshNotifications]);

  const notifications = useMemo(() => {
    return [...realNotifications].sort((a, b) => b.timestamp - a.timestamp);
  }, [realNotifications]);

  const sections = useMemo(() => groupByDate(notifications), [notifications]);
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const hasUnread = unreadCount > 0;

  const handleMarkAllRead = useCallback(() => {
    markAllRead();
  }, [markAllRead]);

  const handleRowPress = useCallback(
    notification => {
      if (!notification.isRead) {
        markAsRead(notification.id);
      }
    },
    [markAsRead],
  );

  return {
    colors,
    isDarkMode,
    styles,
    sections,
    unreadCount,
    hasUnread,
    handleMarkAllRead,
    handleRowPress,
    removeNotification,
    refreshNotifications,
    acceptInvite,
    declineInvite,
  };
}
