import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Rect, Path } from 'react-native-svg';
import { useImageUploadView } from './ImageUploadView.hooks';
import { STRINGS } from './ImageUploadView.strings';
import { CollectionIcon, AppModal } from '../../../../components';

export default function ImageUploadView({
  selectedCol,
  photosList = [],
  takePhoto,
  selectFromGallery,
  removePhotoFromStaging,
  caption,
  setCaption,
  accessibility,
  setAccessibility,
  uploadImage,
  uploading,
}) {
  const { styles, colors } = useImageUploadView();
  const [sourcePickerVisible, setSourcePickerVisible] = useState(false);

  // Premium Custom Document Stack SVG matching the mockup
  const FileUploadIllustration = () => (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      {/* Background Page */}
      <Path
        d="M24 16h24l12 12v36a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Left Slanted Page */}
      <Path
        d="M17 26.5L37 18.5l10.5 26-20 8z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth={1.5}
        strokeLinejoin="round"
        transform="rotate(-8 27 30)"
      />
      {/* Right Slanted Page */}
      <Path
        d="M43 20l20 8-10.5 26-20-8z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth={1.5}
        strokeLinejoin="round"
        transform="rotate(6 48 32)"
      />
      {/* Central Highlighted Page */}
      <Rect
        x={28}
        y={22}
        width={28}
        height={38}
        rx={3}
        fill="#EEF2F6"
        stroke="#6366F1"
        strokeWidth={2}
      />
      {/* Inner Image Icon lines on Page */}
      <Path
        d="M34 48l5.5-5.5 4 4 8.5-8.5M34 32h16M34 38h10"
        stroke="#6366F1"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const handlePickSource = (sourceType) => {
    setSourcePickerVisible(false);
    // Slight delay to ensure modal is dismissed cleanly before picker triggers
    setTimeout(() => {
      if (sourceType === 'camera') {
        takePhoto();
      } else {
        // Both local device gallery and Google Photos use the system image library
        selectFromGallery();
      }
    }, 400);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.uploadContainer} keyboardShouldPersistTaps="handled">

        {/* Target Collection Info Header */}
        <View style={styles.collectionInfoWrap}>
          <Text style={styles.label}>{STRINGS.targetCollectionLabel}</Text>
          <View style={styles.collectionRow}>
            <CollectionIcon color="#FF6B35" size={20} />
            <Text style={styles.collectionNameText}>
              {selectedCol && !selectedCol.isVirtual ? selectedCol.name : STRINGS.unassignedCollection}
            </Text>
          </View>
        </View>

        {/* Upload Container - Dashed Drop-Zone Layout matching user mockup */}
        <View style={styles.dashedDropZone}>
          <FileUploadIllustration />
          
          <Text style={styles.dropZoneTitle}>
            Drag & drop <Text style={styles.boldPrimaryText}>images</Text>,{'\n'}
            <Text style={styles.boldPrimaryText}>videos</Text>, or any <Text style={styles.boldPrimaryText}>file</Text>
          </Text>

          <Text style={styles.dropZoneSubtitle}>
            or{' '}
            <Text style={styles.browseLink} onPress={() => setSourcePickerVisible(true)}>
              browse files
            </Text>{' '}
            on your computer
          </Text>

          <TouchableOpacity
            style={styles.browsePillBtn}
            activeOpacity={0.8}
            onPress={() => setSourcePickerVisible(true)}
          >
            <Text style={styles.browsePillBtnText}>Add Photos</Text>
          </TouchableOpacity>
        </View>

        {/* Staging Area - List of Gathered Photos with Deletion Badges */}
        {photosList.length > 0 && (
          <View style={styles.stagingSection}>
            <Text style={styles.label}>Staged Photos ({photosList.length})</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stagedListScroll}
            >
              {photosList.map((item, index) => (
                <View key={index} style={styles.stagedImageContainer}>
                  <Image source={{ uri: item.uri }} style={styles.stagedImage} />
                  
                  {/* Glassmorphic Delete Overlay Button */}
                  <TouchableOpacity
                    style={styles.deleteBadge}
                    activeOpacity={0.7}
                    onPress={() => removePhotoFromStaging(index)}
                  >
                    <Ionicons name="close" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Caption Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{STRINGS.captionLabel}</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.surface, height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
            value={caption}
            onChangeText={setCaption}
            placeholder={STRINGS.captionPlaceholder}
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Accessibility Switcher */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{STRINGS.accessibilityLabel}</Text>
          <View style={styles.pickerRow}>
            <TouchableOpacity
              style={[
                styles.pickerOption,
                {
                  borderColor: accessibility === 'shared' ? '#FF6B35' : colors.divider,
                  backgroundColor: accessibility === 'shared' ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                },
              ]}
              onPress={() => setAccessibility('shared')}
            >
              <Text style={[styles.pickerOptionText, { color: accessibility === 'shared' ? '#FF6B35' : colors.textPrimary }]}>
                {STRINGS.sharedOption}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pickerOption,
                {
                  borderColor: accessibility === 'private' ? '#FF6B35' : colors.divider,
                  backgroundColor: accessibility === 'private' ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                },
              ]}
              onPress={() => setAccessibility('private')}
            >
              <Text style={[styles.pickerOptionText, { color: accessibility === 'private' ? '#FF6B35' : colors.textPrimary }]}>
                {STRINGS.privateOption}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Action Button */}
        <TouchableOpacity
          style={[
            styles.actionBtn,
            { backgroundColor: photosList.length === 0 ? colors.textTertiary : '#FF6B35' }
          ]}
          onPress={uploadImage}
          disabled={uploading || photosList.length === 0}
        >
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.actionBtnText}>
              {photosList.length > 1
                ? `Upload ${photosList.length} Photos`
                : photosList.length === 1
                ? 'Upload 1 Photo'
                : 'Upload Photos'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Source Picker Bottom Sheet Modal */}
      <AppModal
        title="Import Photos From"
        visible={sourcePickerVisible}
        onClose={() => setSourcePickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.sheetOption}
          onPress={() => handlePickSource('gallery')}
        >
          <Ionicons name="image-outline" size={22} color="#FF6B35" />
          <Text style={styles.sheetOptionText}>Local Device Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sheetOption}
          onPress={() => handlePickSource('google')}
        >
          <Ionicons name="logo-google" size={22} color="#4285F4" />
          <Text style={styles.sheetOptionText}>Google Photos Cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sheetOption}
          onPress={() => handlePickSource('camera')}
        >
          <Ionicons name="camera-outline" size={22} color="#059669" />
          <Text style={styles.sheetOptionText}>Device Camera</Text>
        </TouchableOpacity>
      </AppModal>
    </KeyboardAvoidingView>
  );
}
