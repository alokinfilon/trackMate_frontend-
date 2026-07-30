import React from 'react';
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
import { useImageUploadView } from './ImageUploadView.hooks';
import { STRINGS } from './ImageUploadView.strings';

export default function ImageUploadView({
  selectedCol,
  photo,
  takePhoto,
  caption,
  setCaption,
  accessibility,
  setAccessibility,
  uploadImage,
  uploading,
}) {
  const { styles, colors } = useImageUploadView();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.uploadContainer} keyboardShouldPersistTaps="handled">

        {/* Display active target album info */}
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>{STRINGS.targetCollectionLabel}</Text>
          <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 16, color: '#FF6B35' }}>
            📁 {selectedCol && !selectedCol.isVirtual ? selectedCol.name : STRINGS.unassignedCollection}
          </Text>
        </View>

        {/* Photo Preview container */}
        <TouchableOpacity style={styles.imagePreviewWrap} onPress={takePhoto}>
          {photo && photo.uri ? (
            <Image source={{ uri: photo.uri }} style={styles.previewImg} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="camera-outline" size={44} color={colors.textSecondary} />
              <Text style={styles.placeholderText}>{STRINGS.tapToCapture}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Caption Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{STRINGS.captionLabel}</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.surface }]}
            value={caption}
            onChangeText={setCaption}
            placeholder={STRINGS.captionPlaceholder}
            placeholderTextColor={colors.textTertiary}
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

        {/* Save Action Button */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#FF6B35' }]}
          onPress={uploadImage}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.actionBtnText}>{STRINGS.uploadButton}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
