import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import CollectionIcon from '../../../../components/svg/collectionIcon';
import PlusIcon from '../../../../components/svg/plusIcon';
import { useCollectionsListView } from './CollectionsListView.hooks';
import { STRINGS } from './CollectionsListView.strings';

export default function CollectionsListView({
  loadingGallery,
  collectionsToRender,
  searchQuery,
  selectedTripFilters,
  allImages,
  looseImages,
  setViewMode,
  setSelectedCollectionId,
  startCreateCollection,
  setSelectedActionCol,
  FALLBACK_DECK_IMAGES,
  CARD_BACKDROP_COLORS,
  MOCK_AVATARS,
}) {
  const { styles, isDarkMode, fabVisible, setFabVisible } = useCollectionsListView();

  if (loadingGallery) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (collectionsToRender.length === 0) {
    const isSearchingOrFiltering =
      (searchQuery && searchQuery.trim() !== '') ||
      (selectedTripFilters && selectedTripFilters.length > 0);

    if (isSearchingOrFiltering) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop' }}
            style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
          />
          <Text style={styles.emptyTitle}>{STRINGS.noResultsTitle}</Text>
          <Text style={styles.emptySubtitle}>{STRINGS.noResultsSubtitle}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.photoStack}>
          <View style={[styles.photoCard, { transform: [{ rotate: '-12deg' }], top: 10, left: 15 }]}>
            <Image source={{ uri: FALLBACK_DECK_IMAGES[0] }} style={styles.stackImage} />
          </View>
          <View style={[styles.photoCard, { transform: [{ rotate: '10deg' }], top: 15, right: 15 }]}>
            <Image source={{ uri: FALLBACK_DECK_IMAGES[1] }} style={styles.stackImage} />
          </View>
          <View style={[styles.photoCard, { transform: [{ rotate: '-2deg' }], top: 40, zIndex: 10 }]}>
            <Image source={{ uri: FALLBACK_DECK_IMAGES[2] }} style={styles.stackImage} />
          </View>
        </View>

        <Text style={styles.emptyTitle}>{STRINGS.noCollectionsTitle}</Text>
        <Text style={styles.emptySubtitle}>{STRINGS.noCollectionsSubtitle}</Text>

        <TouchableOpacity
          style={[styles.emptyButton, { flexDirection: 'row', alignItems: 'center', gap: 6 }]}
          onPress={startCreateCollection}
        >
          <PlusIcon size={16} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.emptyButtonText}>{STRINGS.createCollectionBtn}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollList}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setFabVisible(false)}
        onScrollEndDrag={() => setFabVisible(true)}
        onMomentumScrollEnd={() => setFabVisible(true)}
      >
        <View style={styles.sectionHeaderRow}>
          <CollectionIcon color="#000" size={20} />
          <Text style={styles.sectionTitleInline}>{STRINGS.collectionsHeader}</Text>
        </View>
        {collectionsToRender.map((col, index) => {
          const colImages = col.isVirtual
            ? looseImages
            : allImages.filter(img => img.collectionId === col._id || img.collection === col._id);
          const backdropBg = CARD_BACKDROP_COLORS[index % CARD_BACKDROP_COLORS.length];

          return (
            <TouchableOpacity
              key={col._id || index}
              activeOpacity={0.9}
              style={styles.cardContainer}
              onPress={() => {
                setSelectedCollectionId(col._id);
                setViewMode('collection-detail');
              }}
            >
              <View style={[styles.cardBackdrop, { backgroundColor: backdropBg }]}>
                {/* 3 Overlapping Deck Photos */}
                <View style={styles.photoDeck}>
                  <View style={[styles.deckPhoto, { transform: [{ rotate: '-8deg' }] }]}>
                    <Image
                      source={{ uri: colImages[0]?.imageUrl || colImages[0]?.url || colImages[0]?.image_url || FALLBACK_DECK_IMAGES[0] }}
                      style={styles.deckPhotoImage}
                    />
                  </View>
                  <View style={[styles.deckPhoto, { transform: [{ rotate: '4deg' }], marginLeft: -15, zIndex: 2 }]}>
                    <Image
                      source={{ uri: colImages[1]?.imageUrl || colImages[1]?.url || colImages[1]?.image_url || FALLBACK_DECK_IMAGES[1] }}
                      style={styles.deckPhotoImage}
                    />
                  </View>
                  <View style={[styles.deckPhoto, { transform: [{ rotate: '-2deg' }], marginLeft: -15, zIndex: 3 }]}>
                    <Image
                      source={{ uri: colImages[2]?.imageUrl || colImages[2]?.url || colImages[2]?.image_url || FALLBACK_DECK_IMAGES[2] }}
                      style={styles.deckPhotoImage}
                    />
                  </View>
                </View>

                {/* Glassmorphic overlay */}
                <View style={[styles.glassOverlay, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.45)' }]}>
                  <TouchableOpacity
                    style={styles.glassBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      setSelectedCollectionId(col.isVirtual ? null : col._id);
                      setViewMode('upload');
                    }}
                  >
                    <PlusIcon size={16} color="#000000" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Card Labels (Below Card) */}
              <View style={styles.collectionLabelWrap}>
                <View style={styles.titleRow}>
                  <Text style={styles.collectionTitle}>{col.name}</Text>
                </View>
                <Text style={styles.collectionMeta}>
                  {col.description || STRINGS.tripAlbumDefault} • {colImages.length} {STRINGS.memoriesSuffix}
                </Text>

                {/* Member Avatars */}
                <View style={styles.avatarsRow}>
                  <Image source={{ uri: MOCK_AVATARS[0] }} style={styles.avatarCircle} />
                  <Image source={{ uri: MOCK_AVATARS[1] }} style={[styles.avatarCircle, { marginLeft: -6 }]} />
                  <Image source={{ uri: MOCK_AVATARS[2] }} style={[styles.avatarCircle, { marginLeft: -6 }]} />
                  <View style={[styles.avatarCountCircle, { marginLeft: -6 }]}>
                    <Text style={styles.avatarCountText}>+{index === 0 ? 4 : 16}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      {fabVisible && (
        <TouchableOpacity style={styles.fab} onPress={startCreateCollection}>
          <PlusIcon size={24} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      )}
    </View>
  );
}
