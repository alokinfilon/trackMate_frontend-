import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { notificationService, fcmService } from '../services';
import { AuthContext } from './AuthContext';

const NotificationContext = createContext(null);

/**
 * Shape of a notification object in the local store:
 * {
 *   id: string,
 *   title: string,
 *   body: string,
 *   type: 'trip_share' | 'photo_upload' | 'collection_share' | 'reminder' | 'system',
 *   data: object,      // original FCM data payload
 *   isRead: boolean,
 *   timestamp: number, // Date.now()
 * }
 */

function remoteMessageToNotification(remoteMessage) {
  return {
    id: remoteMessage.messageId || String(Date.now()),
    title: remoteMessage.notification?.title || 'TrackMate',
    body: remoteMessage.notification?.body || '',
    type: remoteMessage.data?.type || 'system',
    data: remoteMessage.data || {},
    state: remoteMessage.data?.state || 'unread',
    isRead: false,
    timestamp: Date.now(),
  };
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { userIsAuthenticated } = useContext(AuthContext) || {};
  const foregroundUnsubRef = useRef(null);

  // ── Computed ────────────────────────────────────────────────────────────────
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const addNotification = useCallback(remoteMessage => {
    const notification = remoteMessageToNotification(remoteMessage);
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markAsRead = useCallback(id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n)),
    );
    notificationService.markAsRead(id).catch(() => {});
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    notificationService.markAllRead().catch(() => {});
  }, []);

  const removeNotification = useCallback(id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  /**
   * Pull server notifications and merge with local ones.
   * Server notifications take priority (de-duplicated by id).
   */
  const refreshNotifications = useCallback(async () => {
    try {
      const serverItems = await notificationService.fetchNotifications();
      if (serverItems.length === 0) {
        setNotifications([]);
        return;
      }

      setNotifications(prev => {
        const serverIds = new Set(serverItems.map(n => n._id || n.id));
        // keep local-only items (from FCM foreground), prepend server items
        const localOnly = prev.filter(n => !serverIds.has(n.id));
        const mapped = serverItems.map(n => ({
          id: n._id || n.id,
          title: n.title || 'TrackMate',
          body: n.body || n.message || '',
          type: n.type || 'system',
          data: n.data || {},
          state: n.state || 'unread',
          isRead: n.state === 'read' || n.state === 'actioned',
          timestamp: n.createdAt ? new Date(n.createdAt).getTime() : Date.now(),
          avatar: n.actorId?.user_image || null,
          shareStatus: n.shareId?.status || n.data?.status || 'pending',
        }));
        return [...mapped, ...localOnly].sort(
          (a, b) => b.timestamp - a.timestamp,
        );
      });
    } catch (err) {
      console.warn('[NotificationContext] refresh error:', err.message);
    }
  }, []);

  // ── FCM Foreground listener ─────────────────────────────────────────────────
  useEffect(() => {
    foregroundUnsubRef.current = fcmService.onForegroundMessage(addNotification);
    return () => {
      if (foregroundUnsubRef.current) {
        foregroundUnsubRef.current();
      }
    };
  }, [addNotification]);

  // ── Sync with Auth Status ──────────────────────────────────────────────────
  useEffect(() => {
    if (userIsAuthenticated) {
      fcmService.init();
      refreshNotifications();
    } else {
      setNotifications([]);
    }
  }, [userIsAuthenticated, refreshNotifications]);

  const acceptInvite = useCallback(async id => {
    try {
      await notificationService.acceptInvite(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, state: 'actioned', isRead: true, shareStatus: 'accepted' } : n)),
      );
    } catch (err) {
      console.error('[NotificationContext] Failed to accept invite:', err.message);
      throw err;
    }
  }, []);

  const declineInvite = useCallback(async id => {
    try {
      await notificationService.declineInvite(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, state: 'actioned', isRead: true, shareStatus: 'declined' } : n)),
      );
    } catch (err) {
      console.error('[NotificationContext] Failed to decline invite:', err.message);
      throw err;
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllRead,
    removeNotification,
    refreshNotifications,
    acceptInvite,
    declineInvite,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used inside <NotificationProvider>');
  }
  return ctx;
}

export default NotificationContext;
