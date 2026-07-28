import React, { createContext, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Tokens } from '../theme/theme';

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(null);

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
      default:        return '#6C63FF';
    }
  };

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
              <X color="#6B7280" size={20} />
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
                
                {/* Primary Confirm Button — Neumorphic accent */}
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
  if (!context) {
    throw new Error('useAlertModal must be used within a ModalProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  modalOverlayBlurContainer: {
    flex: 1,
    backgroundColor: 'rgba(61, 72, 82, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCardBodyView: {
    width: '100%',
    maxWidth: 364,
    backgroundColor: '#E0E5EC',
    borderRadius: 32,
    padding: 24,
    position: 'relative',
    // Neumorphic extruded shadow
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E5EC',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Small extruded shadow
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  modalHeadingTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: '#3D4852',
    marginBottom: Tokens.gaps.xlarge,
    paddingRight: 24, 
  },
  modalInputFieldsView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  modalReferralText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    lineHeight: 24,
    color: '#6B7280',
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
    borderRadius: 16,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // Neumorphic small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: '#E0E5EC',
  },
  cancelText: {
    fontFamily: Tokens.typography.families.medium,
    color: '#3D4852',
    fontSize: 14,
  },
  confirmText: {
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FFFFFF',
    fontSize: 14,
  },
});