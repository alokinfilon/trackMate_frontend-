import apiClient from './apiClient';

/**
 * notificationService — all backend calls related to in-app notifications.
 * Gracefully handles 404 (backend endpoint not yet added) by returning empty arrays.
 */
const notificationService = {
  /**
   * Fetch all notifications for the authenticated user.
   */
  async fetchNotifications() {
    try {
      const response = await apiClient('/api/notifications', { method: 'GET' });
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : (Array.isArray(data?.notifications) ? data.notifications : []);
    } catch (err) {
      console.warn('[Notifications] fetchNotifications error:', err.message);
      return [];
    }
  },

  /**
   * Mark a single notification as read.
   */
  async markAsRead(notificationId) {
    try {
      await apiClient(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
      });
    } catch (err) {
      console.warn('[Notifications] markAsRead error:', err.message);
    }
  },

  /**
   * Mark ALL notifications as read.
   */
  async markAllRead() {
    try {
      await apiClient('/api/notifications/read-all', { method: 'PATCH' });
    } catch (err) {
      console.warn('[Notifications] markAllRead error:', err.message);
    }
  },

  /**
   * Accept a collection share invite.
   */
  async acceptInvite(notificationId) {
    const response = await apiClient(`/api/notifications/${notificationId}/accept`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to accept invite');
    }
    return response.json();
  },

  /**
   * Decline a collection share invite.
   */
  async declineInvite(notificationId) {
    const response = await apiClient(`/api/notifications/${notificationId}/decline`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to decline invite');
    }
    return response.json();
  },
};

export default notificationService;
