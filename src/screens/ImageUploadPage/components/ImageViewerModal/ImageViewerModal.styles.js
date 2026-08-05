import { StyleSheet, Platform } from 'react-native';
import { Tokens } from '../../../../theme';

export const createStyles = () =>
  StyleSheet.create({
    viewerOverlay: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewerCloseBtn: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 60 : 30,
      right: 20,
      zIndex: 10,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewerContent: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewerImage: {
      width: '94%',
      height: '70%',
      resizeMode: 'contain',
    },
    viewerCaptionBox: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 60 : 40,
      left: 20,
      right: 20,
      padding: 16,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    viewerCaptionText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.medium,
      fontSize: 15,
      lineHeight: 22,
    },
    viewerBadgeRow: {
      flexDirection: 'row',
      marginTop: 10,
    },
    viewerBadge: {
      color: '#FF6B35',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 12,
    },
  });
