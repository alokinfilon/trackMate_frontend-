import { StyleSheet } from 'react-native';

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  safeArea: { flex: 1, 
    backgroundColor: colors.bg 
  },
  topNav: { flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  container: { flex: 1, 
    padding: 20 
  },

  centerContainer: { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  headerTitle: { fontSize: 16, 
    fontWeight: '700', 
    color: colors.textPrimary 
  },

  switchButton: { backgroundColor: colors.surface, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 6, borderWidth: 1, 
    borderColor: colors.border 
  },
  switchButtonText: { fontSize: 12, 
    fontWeight: '600', 
    color: colors.textPrimary 
  },
  scrollList: { paddingBottom: 20 },

  sectionHeading: { fontSize: 15, 
    fontWeight: '700', 
    color: colors.textPrimary, 
    marginBottom: 8 
  },
  cardItem: { backgroundColor: colors.card,
     padding: 12,
      borderRadius: 8,
       marginBottom: 8, 
       borderWidth: 1, 
       borderColor: colors.border 
      },
  cardTitle: { fontSize: 14, 
    fontWeight: '600',
     color: colors.textPrimary 
    },
  cardDesc: { fontSize: 12, 
    color: colors.textSecondary, 
    marginTop: 2 
  },
  cardMeta: { fontSize: 10,
     color: colors.primary,
      marginTop: 4, 
      fontWeight: '600', 
      textTransform: 'uppercase' 
    },
  emptyText: { color: colors.textTertiary, 
    fontSize: 13, 
    fontStyle: 'italic' 
  },
  imageGrid: { flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  gridImage: { width: 90,
     height: 90,
      borderRadius: 6, 
      backgroundColor: colors.surface
     },

  imagePreviewContainer: { width: '100%',
     height: 220, 
     backgroundColor: colors.surface, 
     borderRadius: 12, 
     alignItems: 'center', 
     justifyContent: 'center', 
     marginBottom: 15, borderWidth: 1, 
     borderColor: colors.border, 
     overflow: 'hidden'
     },
  previewImage: { width: '100%',
     height: '100%', 
     resizeMode: 'cover' 
    },
  placeholderText: { color: colors.textTertiary, 
    fontSize: 14
   },
  textInput: { width: '100%',
     backgroundColor: colors.card,
      borderWidth: 1,
       borderColor: colors.border,
        borderRadius: 8, 
        padding: 10,
         marginBottom: 10,
          fontSize: 14, 
          color: colors.textPrimary
         },
  primaryButton: { 
    backgroundColor: colors.primary, 
    width: '100%',
     paddingVertical: 14,
      borderRadius: 8, 
      alignItems: 'center',
       marginBottom: 10 
      },
  uploadButton: { backgroundColor: colors.success,
     width: '100%', 
     paddingVertical: 14,
      borderRadius: 8,
       alignItems: 'center' 
      },
  disabledButton: {
     backgroundColor: colors.successGhost
     },
  buttonText: { 
    color: colors.textOnPrimary,
     fontSize: 15,
      fontWeight: '600' 
    },
  modalOverlay: {
     flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
       justifyContent: 'flex-end'
       },
  modalContent: {
     borderTopLeftRadius: 20, 
     borderTopRightRadius: 20,
      padding: 20,
       maxHeight: '80%'
       },
  modalHeader: {
     flexDirection: 'row',
     justifyContent: 'space-between',
      alignItems: 'center',
       marginBottom: 15
       },
  modalTitle: { 
    fontSize: 18,
     fontWeight: '700'
     },
  closeText: { 
    fontSize: 16,
     fontWeight: '600' 
    },
  inputLabel: { 
    fontSize: 13,
     fontWeight: '600',
      marginBottom: 6, 
      marginTop: 6
     },
    screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
   mainContainer: {
    flex: 1,
    width: '100%',
  },
});