import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '../../context';
import { Tokens } from '../../theme';
import { createStyles } from './ImageUploadPage.styles';
import { useImageUpload } from './ImageUploadPage.hooks';

// Subcomponents
import CollectionsListView from './components/CollectionsListView/index.js';
import CollectionDetailView from './components/CollectionDetailView/index.js';
import ImageUploadView from './components/ImageUploadView/index.js';
import ImageViewerModal from './components/ImageViewerModal/index.js';
import {
  FilterIcon,
  PlusIcon,
  ExploreIcon,
  TrashIcon,
  PenIcon,
  MoreIcon,
  UsersIcon,
  PersonLockIcon,
  GlobeIcon,
  AppModal
} from '../../components';
import ArrowLeftIcon from '../../components/svg/arrow';

import AccountIcon from '../../components/svg/account';

const FALLBACK_DECK_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop', // Beach
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop', // Roadtrip
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop', // Lake
];

const CARD_BACKDROP_COLORS = ['#FFF1ED', '#E8F0FF', '#F3E8FF'];

const MOCK_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', // Woman 1
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop', // Man 1
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop', // Woman 2
];

export default function ImageUploadPage({ route }) {
  const tripId = route?.params?.tripId;
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    viewMode,
    setViewMode,
    loadingGallery,
    collections,
    allImages,
    createModalVisible,
    setCreateModalVisible,
    editingCollection,
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    collectionAccessibility,
    setCollectionAccessibility,
    creatingCollection,
    handleCreateCollection,
    photosList,
    takePhoto,
    selectFromGallery,
    removePhotoFromStaging,
    uploadImage,
    uploading,
    selectedCollectionId,
    setSelectedCollectionId,
    caption,
    setCaption,
    accessibility,
    setAccessibility,
    userImage,
    trips,
    selectTrip,
    startEditCollection,
    startCreateCollection,
    handleRemoveImageFromCollection,
    collectionPhotos,
    loadingCollectionPhotos,
    collectionTripId,
    setCollectionTripId,
    getTripTitle,
    selectedTripFilters,
    setSelectedTripFilters,
    handleDeleteImage,
    handleDeleteCollection,
    handleUpdateCollectionAccessibility,
    refreshing,
    handleRefresh,
    shareModalVisible,
    setShareModalVisible,
    shareIdentifier,
    setShareIdentifier,
    shareRole,
    setShareRole,
    sharingCollection,
    handleShareCollection,
    collectionPermissions,
  } = useImageUpload(tripId);

  useEffect(() => {
    const handleHardwareBack = () => {
      if (viewMode === 'upload') {
        setViewMode(selectedCollectionId ? 'collection-detail' : 'gallery');
        return true;
      }
      if (viewMode === 'collection-detail') {
        setViewMode('gallery');
        setSelectedCollectionId(null);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [viewMode, selectedCollectionId, setViewMode, setSelectedCollectionId]);

  // Local bottom sheet and modal states
  const [privacyMenuVisible, setPrivacyMenuVisible] = useState(false);
  const [tripPickerVisible, setTripPickerVisible] = useState(false);
  const [collectionTripPickerVisible, setCollectionTripPickerVisible] = useState(false);
  const [selectedActionCol, setSelectedActionCol] = useState(null);
  const [activeViewerImage, setActiveViewerImage] = useState(null);

  // Search & Filter states
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPickerVisible, setFilterPickerVisible] = useState(false);

  const selectedTripForCollection = trips.find(t => t._id === collectionTripId);

  // Split images into loose (ungrouped) and grouped
  const looseImages = useMemo(() => {
    return allImages.filter(img => {
      const colIdStr = typeof img.collectionId === 'object' ? img.collectionId?._id : img.collectionId;
      const colStr = typeof img.collection === 'object' ? img.collection?._id : img.collection;
      return !colIdStr && !colStr;
    });
  }, [allImages]);

  // Combine real collections with virtual "Trip Gallery" card if there are loose images
  const collectionsToRender = useMemo(() => {
    const list = [...collections];
    if (looseImages.length > 0) {
      list.push({
        _id: 'loose',
        name: 'Trip Gallery',
        description: 'General photos in your trip gallery',
        accessibility: 'shared',
        isVirtual: true,
      });
    }
    return list;
  }, [collections, looseImages]);

  const filteredCollections = useMemo(() => {
    let list = [...collectionsToRender];
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter((col) => {
        const colName = (col.name || '').toLowerCase();
        const colDesc = (col.description || '').toLowerCase();
        const linkedTrip = trips.find(t => t._id === col.tripId);
        const tripTitle = linkedTrip ? getTripTitle(linkedTrip).toLowerCase() : '';
        return colName.includes(query) || colDesc.includes(query) || tripTitle.includes(query);
      });
    }
    return list;
  }, [collectionsToRender, searchQuery, trips, getTripTitle]);

  const selectedCol = useMemo(() => {
    if (selectedCollectionId === 'loose') {
      return {
        _id: 'loose',
        name: 'Trip Gallery',
        description: 'General photos in your trip gallery',
        accessibility: 'shared',
        isVirtual: true,
      };
    }
    return collections.find((c) => c._id === selectedCollectionId);
  }, [selectedCollectionId, collections]);

  const handleEditAction = (col) => {
    setSelectedActionCol(null);
    startEditCollection(col);
  };

  const handleDeleteAction = (col) => {
    setSelectedActionCol(null);
    Alert.alert(
      "Delete Album",
      `Are you sure you want to delete "${col.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => handleDeleteCollection(col._id) }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {viewMode === 'gallery' ? (
        <View style={styles.headerLeft}>
          {userImage ? (
            <Image
              source={{ uri: userImage }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={[styles.avatarImage, { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface }]}>
              <AccountIcon stroke={colors.textPrimary} width={22} height={22} />
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (viewMode === 'upload') {
              setViewMode(selectedCollectionId ? 'collection-detail' : 'gallery');
            } else {
              setViewMode('gallery');
              setSelectedCollectionId(null);
            }
          }}
          style={styles.circleButton}
        >
          <ArrowLeftIcon size={26} color="#000000ff" />
        </TouchableOpacity>
      )}

      {isSearchActive && viewMode === 'gallery' ? (
        <View style={styles.headerSearchWrap}>
          <TextInput
            style={[styles.headerSearchInput, { color: colors.textPrimary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search trips, collections..."
            placeholderTextColor={colors.textTertiary}
            autoFocus
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {viewMode === 'collection-detail' && (
            <Text style={styles.tripSelectorText}>
              {selectedCol?.name || 'Album'}
            </Text>
          )}
          {viewMode === 'upload' && (
            <Text style={styles.tripSelectorText}>
              Upload Photo
            </Text>
          )}
          {viewMode === 'gallery' && (
            <Text style={[styles.tripSelectorText, { fontSize: 18, fontFamily: Tokens.typography.families.semiBold }]}>
              Memories
            </Text>
          )}
        </View>
      )}

      <View style={styles.headerRight}>
        {viewMode === 'gallery' ? (
          <>
            <TouchableOpacity
              onPress={startCreateCollection}
              style={styles.circleButton}
            >
              <PlusIcon size={20} color={colors.textPrimary} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSearchActive(!isSearchActive);
                if (isSearchActive) setSearchQuery('');
              }}
              style={styles.circleButton}
            >
              <ExploreIcon color={isSearchActive ? '#FF6B35' : colors.textPrimary} size={20} />
              {isSearchActive && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#000000ff',
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilterPickerVisible(true)}
              style={styles.circleButton}
            >
              <FilterIcon color={selectedTripFilters.length > 0 ? '#FF6B35' : colors.textPrimary} size={20} />
              {selectedTripFilters.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#FF6B35',
                  }}
                />
              )}
            </TouchableOpacity>
          </>
        ) : viewMode === 'collection-detail' && selectedCol && !selectedCol.isVirtual ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, zIndex: 1000 }}>
            {collectionPermissions.canDelete && (
              <View style={{ position: 'relative', zIndex: 2000 }}>
                <TouchableOpacity
                  onPress={() => setPrivacyMenuVisible(!privacyMenuVisible)}
                  style={styles.circleButton}
                >
                  {selectedCol.accessibility === 'private' ? (
                    <PersonLockIcon color={colors.textPrimary} size={18} />
                  ) : selectedCol.accessibility === 'public' ? (
                    <GlobeIcon color={colors.textPrimary} size={18} />
                  ) : (
                    <UsersIcon color={colors.textPrimary} size={18} />
                  )}
                  {privacyMenuVisible && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#FF6B35',
                      }}
                    />
                  )}
                </TouchableOpacity>

                {privacyMenuVisible && (
                  <View style={styles.privacyDropdown}>
                    <TouchableOpacity
                      style={styles.dropdownOption}
                      onPress={() => {
                        setPrivacyMenuVisible(false);
                        handleUpdateCollectionAccessibility(selectedCol._id, 'shared');
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '100%' }}>
                        <UsersIcon color={colors.textPrimary} size={16} />
                        <Text style={styles.dropdownOptionText}>Shared</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownOption}
                      onPress={() => {
                        setPrivacyMenuVisible(false);
                        handleUpdateCollectionAccessibility(selectedCol._id, 'private');
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '100%' }}>
                        <PersonLockIcon color={colors.textPrimary} size={16} />
                        <Text style={styles.dropdownOptionText}>Private</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownOption}
                      onPress={() => {
                        setPrivacyMenuVisible(false);
                        handleUpdateCollectionAccessibility(selectedCol._id, 'public');
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '100%' }}>
                        <GlobeIcon color={colors.textPrimary} size={16} />
                        <Text style={styles.dropdownOptionText}>Public</Text>
                      </View>
                    </TouchableOpacity>
                    {selectedCol.accessibility !== 'private' && (
                      <TouchableOpacity
                        style={[styles.dropdownOption, { borderTopWidth: 1, borderTopColor: colors.divider || '#eaeaea', paddingTop: 8, marginTop: 4 }]}
                        onPress={() => {
                          setPrivacyMenuVisible(false);
                          setShareModalVisible(true);
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '100%' }}>
                          <PlusIcon size={16} color={colors.textPrimary} strokeWidth={2.5} />
                          <Text style={styles.dropdownOptionText}>Share</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            )}

            {collectionPermissions.canDelete && (
              <TouchableOpacity
                onPress={() => handleDeleteAction(selectedCol)}
                style={styles.circleButton}
              >
                <TrashIcon color="#020202ff" size={16} />
              </TouchableOpacity>
            )}

            {collectionPermissions.canEdit && (
              <TouchableOpacity
                onPress={() => handleEditAction(selectedCol)}
                style={styles.circleButton}
              >
                <MoreIcon color={colors.textPrimary} size={16} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderHeader()}

      {viewMode === 'gallery' ? (
        <CollectionsListView
          loadingGallery={loadingGallery}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          collectionsToRender={filteredCollections}
          searchQuery={searchQuery}
          selectedTripFilters={selectedTripFilters}
          allImages={allImages}
          looseImages={looseImages}
          setViewMode={setViewMode}
          setSelectedCollectionId={setSelectedCollectionId}
          startCreateCollection={startCreateCollection}
          setSelectedActionCol={setSelectedActionCol}
          FALLBACK_DECK_IMAGES={FALLBACK_DECK_IMAGES}
          CARD_BACKDROP_COLORS={CARD_BACKDROP_COLORS}
          MOCK_AVATARS={MOCK_AVATARS}
          userImage={userImage}
        />
      ) : viewMode === 'collection-detail' ? (
        <CollectionDetailView
          selectedCol={selectedCol}
          selectedCollectionId={selectedCollectionId}
          collectionPhotos={collectionPhotos}
          loadingCollectionPhotos={loadingCollectionPhotos}
          setViewMode={setViewMode}
          setSelectedCollectionId={setSelectedCollectionId}
          handleRemoveImageFromCollection={handleRemoveImageFromCollection}
          setActiveViewerImage={setActiveViewerImage}
          handleDeleteImage={handleDeleteImage}
          collectionPermissions={collectionPermissions}
        />
      ) : (
        <ImageUploadView
          selectedCol={selectedCol}
          photosList={photosList}
          takePhoto={takePhoto}
          selectFromGallery={selectFromGallery}
          removePhotoFromStaging={removePhotoFromStaging}
          caption={caption}
          setCaption={setCaption}
          accessibility={accessibility}
          setAccessibility={setAccessibility}
          uploadImage={uploadImage}
          uploading={uploading}
        />
      )}

      {/* Share Collection Modal */}
      <AppModal
        title="Share Album"
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={[styles.subtitleText, { marginBottom: 20, fontSize: 13, fontFamily: Tokens.typography.families.regular }]}>
            Invite others by entering their email or mobile number.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipient Identifier</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.surface, color: colors.textPrimary }]}
              value={shareIdentifier}
              onChangeText={setShareIdentifier}
              placeholder="email@example.com or +1234567890"
              placeholderTextColor={colors.textTertiary}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Permission Role</Text>
            <View style={styles.pickerRow}>
              <TouchableOpacity
                style={[
                  styles.pickerOption,
                  {
                    borderColor: shareRole === 'viewer' ? '#08b8f3' : colors.divider,
                    backgroundColor: shareRole === 'viewer' ? 'rgba(8, 184, 243, 0.08)' : 'transparent',
                  },
                ]}
                onPress={() => setShareRole('viewer')}
              >
                <Text style={[styles.pickerOptionText, { color: shareRole === 'viewer' ? '#08b8f3' : colors.textPrimary }]}>
                  Viewer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pickerOption,
                  {
                    borderColor: shareRole === 'editor' ? '#08b8f3' : colors.divider,
                    backgroundColor: shareRole === 'editor' ? 'rgba(8, 184, 243, 0.08)' : 'transparent',
                  },
                ]}
                onPress={() => setShareRole('editor')}
              >
                <Text style={[styles.pickerOptionText, { color: shareRole === 'editor' ? '#08b8f3' : colors.textPrimary }]}>
                  Editor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.modalActionsRow, { marginTop: 24 }]}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.cancelModalBtn]}
              onPress={() => setShareModalVisible(false)}
            >
              <Text style={[styles.modalBtnText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.saveModalBtn, { backgroundColor: '#08b8f3' }]}
              onPress={handleShareCollection}
              disabled={sharingCollection}
            >
              {sharingCollection ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.modalBtnText}>Share</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </AppModal>

      {/* Create / Edit Collection Modal Sheet */}
      <AppModal
        title={editingCollection ? 'Edit Collection' : 'Create Collection'}
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Collection Name</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.surface, color: colors.textPrimary }]}
              value={collectionName}
              onChangeText={setCollectionName}
              placeholder="e.g. Europe Roadtrip"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.surface, color: colors.textPrimary }]}
              value={collectionDescription}
              onChangeText={setCollectionDescription}
              placeholder="Describe your album..."
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Link to Trip</Text>
            <TouchableOpacity
              style={[styles.textInput, { backgroundColor: colors.surface, justifyContent: 'center' }]}
              onPress={() => setCollectionTripPickerVisible(true)}
            >
              <Text style={{ color: selectedTripForCollection ? colors.textPrimary : colors.textTertiary, fontFamily: Tokens.typography.families.medium }}>
                {selectedTripForCollection ? getTripTitle(selectedTripForCollection) : 'None (No specific trip)'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Accessibility</Text>
            <View style={styles.pickerRow}>
              <TouchableOpacity
                style={[
                  styles.pickerOption,
                  {
                    borderColor: collectionAccessibility === 'shared' ? '#FF6B35' : colors.divider,
                    backgroundColor: collectionAccessibility === 'shared' ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                  },
                ]}
                onPress={() => setCollectionAccessibility('shared')}
              >
                <Text style={[styles.pickerOptionText, { color: collectionAccessibility === 'shared' ? '#FF6B35' : colors.textPrimary }]}>
                  Shared
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pickerOption,
                  {
                    borderColor: collectionAccessibility === 'private' ? '#FF6B35' : colors.divider,
                    backgroundColor: collectionAccessibility === 'private' ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                  },
                ]}
                onPress={() => setCollectionAccessibility('private')}
              >
                <Text style={[styles.pickerOptionText, { color: collectionAccessibility === 'private' ? '#FF6B35' : colors.textPrimary }]}>
                  Private
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#FF6B35', marginTop: 16 }]}
            onPress={handleCreateCollection}
            disabled={creatingCollection}
          >
            {creatingCollection ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.actionBtnText}>
                {editingCollection ? 'Save Changes' : 'Create Collection'}
              </Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </AppModal>

      {/* Trip Selector Bottom Sheet */}
      <AppModal
        title="Choose Trip"
        visible={tripPickerVisible}
        onClose={() => setTripPickerVisible(false)}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
          {trips.map((trip) => {
            const isActive = trip._id === tripId;
            return (
              <TouchableOpacity
                key={trip._id}
                style={styles.sheetRow}
                onPress={() => {
                  selectTrip(trip._id);
                  setTripPickerVisible(false);
                }}
              >
                <Text style={[styles.sheetRowText, isActive && { color: '#FF6B35', fontFamily: Tokens.typography.families.semiBold }]}>
                  {getTripTitle(trip)}
                </Text>
                {isActive && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </AppModal>

      {/* Collection Creation/Edit Trip Link Selector Bottom Sheet */}
      <AppModal
        title="Link Collection to Trip"
        visible={collectionTripPickerVisible}
        onClose={() => setCollectionTripPickerVisible(false)}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
          <TouchableOpacity
            style={styles.sheetRow}
            onPress={() => {
              setCollectionTripId(null);
              setCollectionTripPickerVisible(false);
            }}
          >
            <Text style={[styles.sheetRowText, !collectionTripId && { color: '#FF6B35', fontFamily: Tokens.typography.families.semiBold }]}>
              None (No specific trip)
            </Text>
            {!collectionTripId && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
          </TouchableOpacity>

          {trips.map((trip) => {
            const isActive = trip._id === collectionTripId;
            return (
              <TouchableOpacity
                key={trip._id}
                style={styles.sheetRow}
                onPress={() => {
                  setCollectionTripId(trip._id);
                  setCollectionTripPickerVisible(false);
                }}
              >
                <Text style={[styles.sheetRowText, isActive && { color: '#FF6B35', fontFamily: Tokens.typography.families.semiBold }]}>
                  {getTripTitle(trip)}
                </Text>
                {isActive && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </AppModal>

      {/* Multi-Trip Filter Selector Bottom Sheet */}
      <AppModal
        title="Filter by Trips"
        visible={filterPickerVisible}
        onClose={() => setFilterPickerVisible(false)}
      >
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 12, paddingHorizontal: 4 }}>
          Select one or more trips to view their collections:
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
          {trips.map((trip) => {
            const isSelected = selectedTripFilters.includes(trip._id);
            return (
              <TouchableOpacity
                key={trip._id}
                style={styles.sheetRow}
                onPress={() => {
                  setSelectedTripFilters(
                    isSelected
                      ? selectedTripFilters.filter((id) => id !== trip._id)
                      : [...selectedTripFilters, trip._id]
                  );
                }}
              >
                <Text style={[styles.sheetRowText, isSelected && { color: '#FF6B35', fontFamily: Tokens.typography.families.semiBold }]}>
                  {getTripTitle(trip)}
                </Text>
                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={20}
                  color={isSelected ? "#FF6B35" : colors.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          <TouchableOpacity
            style={[styles.actionBtn, { flex: 1, backgroundColor: colors.divider }]}
            onPress={() => {
              setSelectedTripFilters([]);
              setFilterPickerVisible(false);
            }}
          >
            <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { flex: 1, backgroundColor: '#FF6B35' }]}
            onPress={() => setFilterPickerVisible(false)}
          >
            <Text style={styles.actionBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </AppModal>

      {/* Collection Settings Actions Bottom Sheet */}
      <AppModal
        title="Collection Settings"
        visible={!!selectedActionCol}
        onClose={() => setSelectedActionCol(null)}
      >
        {selectedActionCol && (
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              style={styles.sheetRow}
              onPress={() => handleEditAction(selectedActionCol)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                <PenIcon size={20} color="#FF6B35" />
                <Text style={styles.sheetRowText}>Edit Collection</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetRow}
              onPress={() => handleDeleteAction(selectedActionCol)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                <TrashIcon size={20} color="#E53E3E" />
                <Text style={[styles.sheetRowText, { color: '#E53E3E' }]}>Delete Collection</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>
        )}
      </AppModal>

      {/* Full-Screen Image Viewer Modal */}
      <ImageViewerModal
        activeViewerImage={activeViewerImage}
        setActiveViewerImage={setActiveViewerImage}
      />
    </View>
  );
}