import React, { createContext, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
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

  const getVariantGradient = (variant) => {
    switch (variant) {
      case 'error': 
        return ['#F8876C', '#F16646']; 
      case 'success': 
        return ['#F8876C', '#F16646'];
      case 'warning': 
        return ['#F8876C', '#F16646']; 
      default: 
        return ['#F8876C', '#F16646']; 
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
          <Shadow
            distance={1}
            startColor="#FDABAC"
            endColor="#FDEABF"
            offset={[0, 0]}
            containerStyle={styles.shadowModalFluidContainer}
            style={styles.shadowModalFluidStyle}
          >
            <LinearGradient
              colors={['#262627', '#242426', '#1B1C1D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.98 }}
              style={styles.modalCardBodyView}
            >
              {/* Top Right Close 'X' Button */}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={hideModal}
                activeOpacity={0.7}
              >
                <X color="#9CA3AF" size={20} />
              </TouchableOpacity>

              <Text style={styles.modalHeadingTitleText}>
                {config?.title}
              </Text>

              <View style={styles.modalInputFieldsView}>
                <Text style={styles.modalReferralText}>
                  {config?.message}
                </Text>
                
                {/* Horizontal Action Footer Layout */}
                <View style={styles.actionFooterRow}>
                  {/* Cancel Action Button (renders only if requested) */}
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
                  
                  {/* Primary Confirm Action Gradient Button */}
                  <TouchableOpacity 
                    style={styles.buttonTouch} 
                    onPress={handleConfirm}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={getVariantGradient(config?.variant)}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.confirmGradientButton}
                    >
                      <Text style={styles.confirmText}>
                        {config?.confirmText || 'OK'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </Shadow>
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
    backgroundColor: 'rgba(18, 18, 19, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  shadowModalFluidContainer: {
    width: '100%',
    maxWidth: 364,
  },
  shadowModalFluidStyle: {
    width: '100%',
    borderRadius: 20,
  },
  modalCardBodyView: {
    width: '100%',
    backgroundColor: '#1E1E20',
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#323537',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalHeadingTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: '#FFFFFF',
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
    color: '#E5E5E5',
    marginVertical: 4,
  },
  actionFooterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTouch: {
    minWidth: 85,
    height: 40,
  },
  cancelButton: {
    backgroundColor: '#2D2D30',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  confirmGradientButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  cancelText: {
    fontFamily: Tokens.typography.families.medium,
    color: '#D4D4D8',
    fontSize: 14,
  },
  confirmText: {
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FFFFFF',
    fontSize: 14,
  },
});