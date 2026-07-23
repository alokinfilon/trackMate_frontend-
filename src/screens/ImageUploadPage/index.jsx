import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './ImageUploadPage.styles';
import { useImageUpload } from './ImageUploadPage.hooks';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export default function ImageUploadPage({ route }) {
  const tripId = route?.params?.tripId ;

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
    collectionName,
    setCollectionName,
    collectionDescription,
    setCollectionDescription,
    creatingCollection,
    photo,
    uploading,
    caption,
    setCaption,
    accessibility,
    setAccessibility,
    handleCreateCollection,
    takePhoto,
    uploadImage,
    selectedCollectionId,
    setSelectedCollectionId
  } = useImageUpload(tripId);

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[isDarkMode ? '#1E293B' : '#ace9fd', colors.bg]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0.98 }}
        style={styles.screenContainer}
      >
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
        <SafeAreaView
          style={styles.mainContainer}
          edges={['top', 'left', 'right']}
        >
          <View style={styles.topNav}>
            <Text style={styles.headerTitle}>
              {viewMode === 'gallery' ? 'Trip Gallery & Collections' : 'Upload Trip Media Asset'}
            </Text>
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setViewMode(viewMode === 'gallery' ? 'upload' : 'gallery')}
            >
              <Text style={styles.switchButtonText}>
                {viewMode === 'gallery' ? '📤 Upload' : '🖼️ Gallery'}
              </Text>
            </TouchableOpacity>
          </View>

          {viewMode === 'gallery' ? (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setCreateModalVisible(true)}
              >
                <Text style={styles.buttonText}>+ Add New Collection</Text>
              </TouchableOpacity>

              {loadingGallery ? (
                <View style={styles.centerContainer}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : (
                <ScrollView contentContainerStyle={styles.scrollList}>
                  <Text style={styles.sectionHeading}>Collections</Text>
                  
                  {/* 🎯 FIX 2: Clear selected items tracking safely across screen selections */}
                  {selectedCollectionId && (
                    <TouchableOpacity 
                      style={{ marginBottom: 10, padding: 4 }}
                      onPress={() => setSelectedCollectionId(null)}
                    >
                      <Text style={{ color: colors.primary, fontWeight: '600' }}>⚠️ Clear Album Selection</Text>
                    </TouchableOpacity>
                  )}

                 {collections.length > 0 ? (
                            collections.map((col, index) => {
                              const isSelected = selectedCollectionId === col._id;

                              return (
                                <TouchableOpacity 
                                  key={col._id || index} 
                                  style={[styles.cardItem, isSelected && styles.selectedCardItem]} 
                                  onPress={() => setSelectedCollectionId(col._id)} 
                                >
                                  <Text style={styles.cardTitle}>{col.name}</Text>
                                  {col.description ? <Text style={styles.cardDesc}>{col.description}</Text> : null}
                                  <Text style={styles.cardMeta}>Access: {col.accessibility}</Text>
                                  {isSelected && <Text style={styles.checkmarkIcon}>✓ Selected for upload</Text>}
                                </TouchableOpacity>
                              );
                            })
                          ) :(
                    <Text style={styles.emptyText}>No collections found.</Text>
                  )}

                  <Text style={[styles.sectionHeading, { marginTop: 20 }]}>All Uploaded Images</Text>
                  {allImages.length > 0 ? (
                    <View style={styles.imageGrid}>
                      {allImages.map((imgItem, index) => (
                        <Image
                          key={imgItem._id || index}
                          source={{ uri: imgItem.imageUrl || imgItem.url || imgItem.image_url || imgItem.uri }}
                          style={styles.gridImage}
                        />
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.emptyText}>No images uploaded yet.</Text>
                  )}
                </ScrollView>
              )}
            </View>
          ) : (
            <View style={styles.container}>
              
              {/* 🎯 FIX 3: Visual indicator displaying which folder the photo will upload into */}
              <View style={{ backgroundColor: colors.surface, padding: 12, borderRadius: 8, marginBottom: 15 }}>
                <Text style={{ color: colors.textSecondary }}>Target Folder:</Text>
                <Text style={{ color: selectedCollectionId ? colors.primary : '#E65100', fontWeight: 'bold', marginTop: 2 }}>
                  {selectedCollectionId 
                    ? `📁 linked directly to active Collection ID` 
                    : "⚠️ loose photo inside trip (collectionId: null)"}
                </Text>
              </View>

              <View style={styles.imagePreviewContainer}>
                {photo ? (
                  <Image source={{ uri: photo.uri }} style={styles.previewImage} />
                ) : (
                  <Text style={styles.placeholderText}>No image captured yet</Text>
                )}
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="Caption"
                placeholderTextColor={colors.textTertiary}
                value={caption}
                onChangeText={setCaption}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Accessibility (shared / private)"
                placeholderTextColor={colors.textTertiary}
                value={accessibility}
                onChangeText={setAccessibility}
              />

              <TouchableOpacity style={styles.primaryButton} onPress={takePhoto}>
                <Text style={styles.buttonText}>📸 Open Device Camera</Text>
              </TouchableOpacity>

              {photo && (
                <TouchableOpacity
                  style={[styles.uploadButton, uploading && styles.disabledButton]}
                  onPress={uploadImage}
                  disabled={uploading}
                >
                  {uploading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>📤 Send to Trip Gallery</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}

          <Modal
            visible={createModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setCreateModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Create Gallery Collection</Text>
                  <TouchableOpacity onPress={() => setCreateModalVisible(false)}>
                    <Text style={[styles.closeText, { color: colors.textSecondary }]}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Collection Name</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.surface }]}
                  placeholder="e.g. Fort Sunset Shots"
                  placeholderTextColor={colors.textTertiary}
                  value={collectionName}
                  onChangeText={setCollectionName}
                />

                <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Description</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.surface }]}
                  placeholder="Evening photos from day 2"
                  placeholderTextColor={colors.textTertiary}
                  value={collectionDescription}
                  onChangeText={setCollectionDescription}
                />

                <TouchableOpacity
                  style={[styles.primaryButton, { marginTop: 10 }]}
                  onPress={handleCreateCollection}
                  disabled={creatingCollection}
                >
                  {creatingCollection ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Save Collection</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
      </SafeAreaProvider>)}
