import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import CollectionIcon from '../../../../components/svg/collectionIcon';
import PlusIcon from '../../../../components/svg/plusIcon';
import AccountIcon from '../../../../components/svg/account';
import { useCollectionsListView } from './CollectionsListView.hooks';
import { STRINGS } from './CollectionsListView.strings';

export default function CollectionsListView({
  loadingGallery,
  refreshing,
  onRefresh,
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
  userImage, // Passed dynamically from hook
}) {
  const { styles, isDarkMode } = useCollectionsListView();

  if (loadingGallery) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  const isSearchingOrFiltering =
    (searchQuery && searchQuery.trim() !== '') ||
    (selectedTripFilters && selectedTripFilters.length > 0);

  // Mock Discover Stories Data
  const mockStories = [
    { id: '1', name: 'Brian S', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120', isLive: true },
    { id: '2', name: 'Jennie', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120' },
    { id: '3', name: 'James', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120' },
    { id: '4', name: 'Roés', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120' },
  ];

  const renderStories = () => (
    <View style={styles.storiesWrapper}>
      <Text style={styles.storiesTitle}>Discover</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesScrollView}
      >
        {/* User's "Add story" button with profile avatar */}
        <View style={styles.storyCard}>
          <TouchableOpacity style={[styles.storyAvatarWrapper, { borderColor: 'rgba(255, 107, 53, 0.3)' }]} activeOpacity={0.8}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.storyAvatarImage} />
            ) : (
              <AccountIcon stroke={isDarkMode ? '#A0AEC0' : '#718096'} width={24} height={24} />
            )}
            <View style={styles.storyAddBtn}>
              <PlusIcon size={12} color="#FFFFFF" strokeWidth={3} />
            </View>
          </TouchableOpacity>
          <Text style={styles.storyNameText} numberOfLines={1}>Add story</Text>
        </View>

        {/* Mock Friend Stories */}
        {mockStories.map((story) => (
          <View key={story.id} style={styles.storyCard}>
            <TouchableOpacity style={styles.storyAvatarWrapper} activeOpacity={0.8}>
              <Image source={{ uri: story.image }} style={styles.storyAvatarImage} />
              {story.isLive && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>Live</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.storyNameText} numberOfLines={1}>{story.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B35"
            colors={['#FF6B35']}
          />
        }
      >
        {/* 1. Discover Stories Row at the very top */}
        {renderStories()}

        {/* 2. Collections Section Header */}
        <View style={styles.sectionHeaderRow}>
          <CollectionIcon color={isDarkMode ? '#FFFFFF' : '#000'} size={20} />
          <Text style={styles.sectionTitleInline}>{STRINGS.collectionsHeader}</Text>
        </View>

        {/* 3. Collections List or Inline Empty State */}
        {collectionsToRender.length === 0 ? (
          isSearchingOrFiltering ? (
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop' }}
                style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
              />
              <Text style={styles.emptyTitle}>{STRINGS.noResultsTitle}</Text>
              <Text style={styles.emptySubtitle}>{STRINGS.noResultsSubtitle}</Text>
            </View>
          ) : (
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
                style={[styles.emptyButton, { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FF6B35' }]}
                onPress={startCreateCollection}
              >
                <PlusIcon size={16} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.emptyButtonText}>{STRINGS.createCollectionBtn}</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          collectionsToRender.map((col, index) => {
            const colImages = col.isVirtual
              ? looseImages
              : allImages.filter(img => {
                  const colIdStr = typeof img.collectionId === 'object' ? img.collectionId?._id : img.collectionId;
                  const colStr = typeof img.collection === 'object' ? img.collection?._id : img.collection;
                  return colIdStr === col._id || colStr === col._id;
                });
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
          })
        )}
      </ScrollView>
    </View>
  );
}
