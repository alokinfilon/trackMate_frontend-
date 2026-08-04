import React, { createContext, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Tokens } from '../theme';
import { useTheme } from '../context';

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(null);
  const { colors, isDarkMode } = useTheme();

  const showModal = (options) => {
    setConfig(options);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    if (config?.onCancel) config.onCancel();
  };

  const handleConfirm = () => {
    setVisible(false);
    if (config?.onConfirm) config.onConfirm();
  };

  const getVariantColor = (variant) => {
    switch (variant) {
      case 'error':   return '#E53E3E';
      case 'success': return '#38B2AC';
      case 'warning': return '#ED8936';
      default:        return colors.primary || '#6C63FF';
    }
  };

  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        visible={visible} 
        transparent 
        animationType="fade" 
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlayBlurContainer}>
          <View style={styles.modalCardBodyView}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={hideModal}
              activeOpacity={0.7}
            >
              <X color={colors.textSecondary} size={20} />
            </TouchableOpacity>

            <Text style={styles.modalHeadingTitleText}>
              {config?.title}
            </Text>

            <View style={styles.modalInputFieldsView}>
              <Text style={styles.modalReferralText}>
                {config?.message}
              </Text>
              
              {/* Action Footer */}
              <View style={styles.actionFooterRow}>
                {/* Cancel Button */}
                {(config?.onCancel || config?.cancelText) && (
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={hideModal}
                  >
                    <Text style={styles.cancelText}>
                      {config?.cancelText || 'Cancel'}
                    </Text>
                  </TouchableOpacity>
                )}
                
                {/* Primary Confirm Button */}
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: getVariantColor(config?.variant) }]} 
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmText}>
                    {config?.confirmText || 'OK'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useAlertModal = () => {
  const context = useContext(ModalContext);
  console.log('useAlertModal context value:', context);
  if (!context) {
    throw new Error('useAlertModal must be used within a ModalProvider');
  }
  return context;
};

export const AppModal = ({ visible, onClose, title, children }) => {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayBlurContainer}>
        <View style={styles.modalCardBodyView}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <X color={colors.textSecondary} size={20} />
          </TouchableOpacity>

          {title ? (
            <Text style={styles.modalHeadingTitleText}>
              {title}
            </Text>
          ) : null}

          <View style={styles.modalInputFieldsView}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};


const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    modalOverlayBlurContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    modalCardBodyView: {
      width: '100%',
      maxWidth: 364,
      maxHeight: '80%',
      backgroundColor: colors.cardElevated || colors.card || (isDarkMode ? '#242444' : '#FFFFFF'),
      borderRadius: 24,
      padding: 24,
      position: 'relative',
      // Modern subtle shadow
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    modalCloseButton: {
      position: 'absolute',
      right: 16,
      top: 16,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    modalHeadingTitleText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 18,
      lineHeight: 28,
      color: colors.textPrimary,
      marginBottom: 16,
      paddingRight: 24, 
    },
    modalInputFieldsView: {
      width: '100%',
      gap: 16,
      flexShrink: 1,
    },
    modalReferralText: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 14,
      lineHeight: 22,
      color: colors.textSecondary,
      marginVertical: 4,
    },
    actionFooterRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      minWidth: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    cancelText: {
      fontFamily: Tokens.typography.families.medium,
      color: colors.textSecondary,
      fontSize: 14,
    },
    confirmText: {
      fontFamily: Tokens.typography.families.semiBold,
      color: '#FFFFFF',
      fontSize: 14,
    },
  });