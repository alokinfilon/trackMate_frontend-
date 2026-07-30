import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './ImageUploadPage.styles';
import { useImageUpload } from './ImageUploadPage.hooks';

// Subcomponents
import CollectionsListView from './components/CollectionsListView';
import CollectionDetailView from './components/CollectionDetailView';
import ImageUploadView from './components/ImageUploadView';
import ImageViewerModal from './components/ImageViewerModal';
import FilterIcon from '../../components/svg/filterIcon';
import ExploreIcon from '../../components/svg/exploreIcon';
import TrashIcon from '../../components/svg/trashIcon';
import PenIcon from '../../components/svg/penIcon';
import CollectionIcon from '../../components/svg/collectionIcon';
import ArrowLeftIcon from '../../components/svg/arrow';

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
    photo,
    takePhoto,
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
    activeTripName,
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
  } = useImageUpload(tripId);

  // Local bottom sheet and modal states
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
    return allImages.filter(img => !img.collectionId && !img.collection);
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
        // Resolve linked trip name
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
          <Image
            source={{ uri: userImage || MOCK_AVATARS[0] }}
            style={styles.avatarImage}
          />
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
          <ArrowLeftIcon size={20} color="#FF6B35" />
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
            <Text style={[styles.tripSelectorText, { fontSize: 18, fontFamily: 'Outfit-Bold' }]}>
              Memories
            </Text>
          )}
        </View>
      )}

      <View style={styles.headerRight}>
        {viewMode === 'gallery' ? (
          <>
            <TouchableOpacity 
              onPress={() => {
                setIsSearchActive(!isSearchActive);
                if (isSearchActive) setSearchQuery('');
              }} 
              style={[styles.circleButton, isSearchActive && { borderColor: '#FF6B35', borderWidth: 1 }]}
            >
              <ExploreIcon color={isSearchActive ? '#FF6B35' : colors.textPrimary} size={20} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setFilterPickerVisible(true)} 
              style={[styles.circleButton, selectedTripFilters.length > 0 && { borderColor: '#FF6B35', borderWidth: 1 }]}
            >
              <FilterIcon color={selectedTripFilters.length > 0 ? '#FF6B35' : colors.textPrimary} size={20} />
            </TouchableOpacity>
          </>
        ) : viewMode === 'collection-detail' && selectedCol && !selectedCol.isVirtual ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity 
              onPress={() => handleEditAction(selectedCol)} 
              style={styles.circleButton}
            >
              <PenIcon color={colors.textPrimary} size={16} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleDeleteAction(selectedCol)} 
              style={styles.circleButton}
            >
              <TrashIcon color="#E53E3E" size={16} />
            </TouchableOpacity>
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
        />
      ) : (
        <ImageUploadView
          selectedCol={selectedCol}
          photo={photo}
          takePhoto={takePhoto}
          caption={caption}
          setCaption={setCaption}
          accessibility={accessibility}
          setAccessibility={setAccessibility}
          uploadImage={uploadImage}
          uploading={uploading}
        />
      )}

      {/* Create / Edit Collection Modal Sheet */}
      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.modalContent}>
              <View style={styles.modalIndicator} />
              
              <Text style={styles.modalTitle}>
                {editingCollection ? 'Edit Collection' : 'Create Collection'}
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Collection Name</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.surface }]}
                  value={collectionName}
                  onChangeText={setCollectionName}
                  placeholder="e.g. Europe Roadtrip"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.surface }]}
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
                  <Text style={{ color: selectedTripForCollection ? colors.textPrimary : colors.textTertiary, fontFamily: 'Outfit-Medium' }}>
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
                style={[styles.actionBtn, { backgroundColor: '#FF6B35' }]}
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
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Trip Selector Bottom Sheet */}
      <Modal
        visible={tripPickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTripPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.modalTitle}>Choose Trip</Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Text style={[styles.sheetRowText, isActive && { color: '#FF6B35', fontFamily: 'Outfit-Bold' }]}>
                      {getTripTitle(trip)}
                    </Text>
                    {isActive && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: colors.divider, marginTop: 16 }]}
              onPress={() => setTripPickerVisible(false)}
            >
              <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Collection Creation/Edit Trip Link Selector Bottom Sheet */}
      <Modal
        visible={collectionTripPickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCollectionTripPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.modalTitle}>Link Collection to Trip</Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* None (No specific trip) Option */}
              <TouchableOpacity
                style={styles.sheetRow}
                onPress={() => {
                  setCollectionTripId(null);
                  setCollectionTripPickerVisible(false);
                }}
              >
                <Text style={[styles.sheetRowText, !collectionTripId && { color: '#FF6B35', fontFamily: 'Outfit-Bold' }]}>
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
                    <Text style={[styles.sheetRowText, isActive && { color: '#FF6B35', fontFamily: 'Outfit-Bold' }]}>
                      {getTripTitle(trip)}
                    </Text>
                    {isActive && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: colors.divider, marginTop: 16 }]}
              onPress={() => setCollectionTripPickerVisible(false)}
            >
              <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Multi-Trip Filter Selector Bottom Sheet */}
      <Modal
        visible={filterPickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.modalTitle}>Filter by Trips</Text>
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
                    <Text style={[styles.sheetRowText, isSelected && { color: '#FF6B35', fontFamily: 'Outfit-Bold' }]}>
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
          </View>
        </View>
      </Modal>

      {/* Collection Settings Actions Bottom Sheet */}
      <Modal
        visible={!!selectedActionCol}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedActionCol(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.modalTitle}>Collection Settings</Text>

            {selectedActionCol && (
              <View>
                <TouchableOpacity
                  style={styles.sheetRow}
                  onPress={() => handleEditAction(selectedActionCol)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <PenIcon size={20} color="#FF6B35" />
                    <Text style={styles.sheetRowText}>Edit Collection</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sheetRow}
                  onPress={() => handleDeleteAction(selectedActionCol)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TrashIcon size={20} color="#E53E3E" />
                    <Text style={[styles.sheetRowText, { color: '#E53E3E' }]}>Delete Collection</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: colors.divider, marginTop: 24 }]}
              onPress={() => setSelectedActionCol(null)}
            >
              <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Full-Screen Image Viewer Modal */}
      <ImageViewerModal
        activeViewerImage={activeViewerImage}
        setActiveViewerImage={setActiveViewerImage}
      />
    </View>
  );
}
