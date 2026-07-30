import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlusIcon from '../../../../components/svg/plusIcon';
import TrashIcon from '../../../../components/svg/trashIcon';
import { useCollectionDetailView } from './CollectionDetailView.hooks';
import { STRINGS } from './CollectionDetailView.strings';

export default function CollectionDetailView({
  selectedCol,
  selectedCollectionId,
  collectionPhotos,
  loadingCollectionPhotos,
  setViewMode,
  setSelectedCollectionId,
  handleRemoveImageFromCollection,
  setActiveViewerImage,
  handleDeleteImage,
}) {
  const {
    styles,
    colors,
    fabVisible,
    setFabVisible,
    focusedImageDeleteId,
    setFocusedImageDeleteId,
  } = useCollectionDetailView();

  if (loadingCollectionPhotos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  const imagesToRender = collectionPhotos || [];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setFabVisible(false)}
        onScrollEndDrag={() => setFabVisible(true)}
        onMomentumScrollEnd={() => setFabVisible(true)}
      >
        <Text style={styles.detailCollectionTitle}>{selectedCol?.name}</Text>
        <Text style={styles.detailCollectionMeta}>
          {selectedCol?.description || STRINGS.noDescription}
        </Text>
        <View style={styles.detailBadgeRow}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  selectedCol?.accessibility === 'shared'
                    ? 'rgba(255, 107, 53, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                {
                  color:
                    selectedCol?.accessibility === 'shared'
                      ? '#FF6B35'
                      : colors.textSecondary,
                },
              ]}
            >
              {selectedCol?.accessibility === 'shared'
                ? STRINGS.sharedAlbum
                : STRINGS.privateAlbum}
            </Text>
          </View>
        </View>

        {imagesToRender.length === 0 ? (
          <View style={styles.detailEmptyContainer}>
            <Ionicons name="images-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.detailEmptyText}>{STRINGS.noImagesText}</Text>
            <TouchableOpacity
              style={[styles.emptyButton, { marginTop: 12, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 6 }]}
              onPress={() => {
                setSelectedCollectionId(selectedCollectionId === 'loose' ? null : selectedCollectionId);
                setViewMode('upload');
              }}
            >
              <PlusIcon size={16} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.emptyButtonText}>{STRINGS.addPhotoBtn}</Text>
            </TouchableOpacity>
          </View>
        ) : (() => {
          const getAspectRatio = (index) => {
            const ratios = [1.5, 0.58, 0.72, 0.76, 0.82, 1.25];
            return ratios[index % ratios.length];
          };

          const leftColImages = imagesToRender.filter((_, i) => i % 2 === 0);
          const rightColImages = imagesToRender.filter((_, i) => i % 2 === 1);

          const renderItem = (img, originalIndex) => {
            const isLeft = originalIndex % 2 === 0;
            const itemAspectRatio = getAspectRatio(originalIndex);
            
            // Mock stats row matching visual screenshot values
            const showMockStats = originalIndex >= 2;
            let mockStatA = "1.2k";
            let mockStatB = "417";
            if (originalIndex === 3) {
              mockStatA = "1.4k";
              mockStatB = "352";
            } else if (originalIndex === 4) {
              mockStatA = "1.2k";
              mockStatB = "417";
            } else if (originalIndex > 4) {
              mockStatA = `${(originalIndex + 1) * 315}`;
              mockStatB = `${(originalIndex + 1) * 62}`;
            }

            return (
              <TouchableOpacity
                key={img._id || originalIndex}
                style={[styles.gridItem, { aspectRatio: itemAspectRatio }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (focusedImageDeleteId) {
                    setFocusedImageDeleteId(null);
                  } else {
                    setActiveViewerImage(img);
                  }
                }}
                onLongPress={() => setFocusedImageDeleteId(img._id)}
              >
                <Image
                  source={{ uri: img.imageUrl || img.url || img.image_url }}
                  style={styles.gridImage}
                />

                {/* Delete Photo Overlay Button */}
                {focusedImageDeleteId === img._id && (
                  <TouchableOpacity
                    style={styles.deleteOverlayBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      Alert.alert(
                        STRINGS.deleteImageTitle,
                        STRINGS.deleteImageMessage,
                        [
                          { text: STRINGS.deleteCancel, style: 'cancel' },
                          {
                            text: STRINGS.deleteConfirm,
                            style: 'destructive',
                            onPress: () => {
                              setFocusedImageDeleteId(null);
                              handleDeleteImage(img._id);
                            },
                          },
                        ],
                      );
                    }}
                  >
                    <TrashIcon size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                {/* Untag / Remove Image button (only for non-virtual, user-defined collections) */}
                {selectedCollectionId !== 'loose' && (
                  <TouchableOpacity
                    style={styles.untagButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      Alert.alert(
                        STRINGS.removeFromCollectionTitle,
                        STRINGS.removeFromCollectionMessage,
                        [
                          { text: STRINGS.removeCancel, style: 'cancel' },
                          {
                            text: STRINGS.removeConfirm,
                            style: 'destructive',
                            onPress: () => handleRemoveImageFromCollection(img._id),
                          },
                        ],
                      );
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#E53E3E" />
                  </TouchableOpacity>
                )}

                {/* Glassmorphic overlay stats */}
                {showMockStats && (
                  <View style={styles.statsOverlayRow}>
                    {isLeft ? (
                      <>
                        <View style={styles.glassPill}>
                          <Ionicons name="heart" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                          <Text style={styles.glassPillText}>{mockStatA}</Text>
                        </View>
                        <View style={styles.glassPill}>
                          <Ionicons name="chatbubble" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                          <Text style={styles.glassPillText}>{mockStatB}</Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.glassPill}>
                          <Ionicons name="bookmark" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                          <Text style={styles.glassPillText}>{mockStatA}</Text>
                        </View>
                        <View style={styles.glassPill}>
                          <Ionicons name="share-social" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                          <Text style={styles.glassPillText}>{mockStatB}</Text>
                        </View>
                      </>
                    )}
                  </View>
                )}

                {img.caption && !showMockStats && (
                  <View style={styles.gridCaptionBar}>
                    <Text style={styles.gridCaptionText} numberOfLines={1}>
                      {img.caption}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          };

          return (
            <View style={styles.masonryContainer}>
              <View style={styles.masonryColumn}>
                {leftColImages.map((img, idx) => renderItem(img, idx * 2))}
              </View>
              <View style={styles.masonryColumn}>
                {rightColImages.map((img, idx) => renderItem(img, idx * 2 + 1))}
              </View>
            </View>
          );
        })()}
      </ScrollView>

      {/* Floating Action Button to upload directly to this collection */}
      {fabVisible && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setSelectedCollectionId(selectedCollectionId === 'loose' ? null : selectedCollectionId);
            setViewMode('upload');
          }}
        >
          <PlusIcon size={24} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      )}
    </View>
  );
}
