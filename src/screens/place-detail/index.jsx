import React, { useState } from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Tokens } from '../../theme/theme';
import ArrowLeftIcon from '../../components/svg/arrow';
import apiClient from '../../services/apiClient';
import { createStyles } from './place-detail.styles';
import { useProductDetails } from './place-detail.hooks';
import { useTheme } from '../../context/ThemeContext';

export default function PlaceDetails({ route, navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const {
    place,
    loading,

    activeTab,
    setActiveTab,
    handleGoBack,
    handleScroll,
  } = useProductDetails(route, navigation);

  const [addTripModalVisible, setAddTripModalVisible] = useState(false);
  const [tripPeople, setTripPeople] = useState('2');
  const [tripStart, setTripStart] = useState('2026-08-15');
  const [tripEnd, setTripEnd] = useState('2026-08-22');
  const [tripSublocations, setTripSublocations] = useState([]);
  const [isAddingTrip, setIsAddingTrip] = useState(false);

  const toggleSublocation = locName => {
    setTripSublocations(prev => {
      if (prev.includes(locName)) {
        return prev.filter(name => name !== locName);
      }
      return [...prev, locName];
    });
  };

  const handleAddTripSubmit = async () => {
    try {
      setIsAddingTrip(true);

      const payload = {
        location_id: place?.id || '',
        sublocation: tripSublocations,
        price: 140.5,
        number_of_people: parseInt(tripPeople, 10) || 1,
        start_date: tripStart,
        end_date: tripEnd,
      };

      const response = await apiClient('/api/trips', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch (e) { }

      if (response.ok && data.success !== false) {
        Alert.alert('Success', 'Trip added successfully!');
        setAddTripModalVisible(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to add trip.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network or server issue.');
    } finally {
      setIsAddingTrip(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.screenContainer,
          { 
            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
            justifyContent: 'center', 
            alignItems: 'center' 
          },
        ]}
      >
        <ActivityIndicator size="large" color="#F8876C" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.screenContainer,
          { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }
        ]}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView
          style={styles.mainContainer}
          edges={['top', 'left', 'right']}
        >
          <View style={styles.backHeaderView}>
            <TouchableOpacity
              style={styles.backButtonView}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon
                size={Tokens.scaleAsset(24)}
                color={colors.textPrimary}
                strokeWidth={1.5}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.headerView}>
              <Text style={styles.productTitleText}>
                {place?.name || 'Loading...'}
              </Text>
              <Text style={styles.productSubtitleText}>
                {place?.location || ''}
              </Text>
              <Text style={styles.categoryText}>Historical Site</Text>
            </View>

            {place?.heroImage && (
              <View style={[styles.postBoxView, styles.heroImageWrapper]}>
                <Image
                  source={{ uri: place.heroImage }}
                  style={styles.heroImageContent}
                  resizeMode="cover"
                />
              </View>
            )}

            <View style={styles.sectionContainer}>
              <Text style={styles.descriptionText}>{place?.description}</Text>
              {place?.rating && (
                <Text style={styles.ratingText}>Rating: ★ {place.rating}</Text>
              )}
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Location</Text>

              {/* Address Line */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>Address: </Text>
                <Text style={styles.answerText}>
                  {place?.geography?.address || 'N/A'}
                </Text>
              </Text>

              {/* City Line */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>City: </Text>
                <Text style={styles.answerText}>
                  {place?.geography?.city || 'N/A'}
                </Text>
              </Text>

              {/* State Line */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>State: </Text>
                <Text style={styles.answerText}>
                  {place?.geography?.state || 'N/A'}
                </Text>
              </Text>

              {/* Country Line */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>Country: </Text>
                <Text style={styles.answerText}>
                  {place?.geography?.country || 'N/A'}
                </Text>
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Logistics</Text>
              {/* Opening Hours Section */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>Opening Hours: </Text>
                <Text style={styles.answerText}>
                  {place?.logistics?.opening_hours?.weekdays || 'N/A'}
                </Text>
              </Text>

              {/* Best Time to Visit Section */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>Best Time to Visit: </Text>
                <Text style={styles.answerText}>
                  {place?.logistics?.best_time_to_visit || 'N/A'}
                </Text>
              </Text>

              {/* Crowd Level Section */}
              <Text style={styles.sectionBodyText}>
                <Text style={styles.labelText}>Crowd Level: </Text>
                <Text style={styles.answerText}>
                  {place?.logistics?.crowd_level_indicator || 'N/A'}
                </Text>
              </Text>
            </View>

            <View style={styles.Divider1} />

            <View style={styles.tabView}>
              {['Trivia and Culture', 'Historical Context', 'Sub Location'].map(
                tab => {
                  const isTabActive = activeTab === tab;
                  return (
                    <TouchableOpacity
                      key={tab}
                      onPress={() => setActiveTab(tab)}
                      activeOpacity={0.85}
                      style={styles.buttonWrapper}
                    >
                      {isTabActive ? (
                        <LinearGradient
                          colors={[colors.border, colors.border]}
                          start={{ x: 0, y: 0.5 }}
                          end={{ x: 1, y: 0.5 }}
                          style={styles.activeBorderGradientView}
                        >
                          <View style={styles.activeSolidBackgroundMaskShield}>
                            <LinearGradient
                              colors={[
                                colors.primaryGhost,
                                colors.primaryGhost,
                              ]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.activeGredientView}
                            >
                              <Text style={styles.categoryTabText}>{tab}</Text>
                            </LinearGradient>
                          </View>
                        </LinearGradient>
                      ) : (
                        <View style={styles.activeGredientView1}>
                          <Text style={styles.categoryTabText1}>{tab}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                },
              )}
            </View>

            {activeTab === 'Trivia and Culture' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Customs & Hidden Gems</Text>
                  <Text style={styles.tabText2}>
                    {place?.trivia?.hidden_gem ||
                      'No customs information available.'}
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Facts</Text>
                  <Text style={styles.tabText2}>
                    {place?.trivia?.quick_facts?.join('\n\n') ||
                      'No facts available.'}
                  </Text>
                </View>
              </View>
            )}

            {activeTab === 'Historical Context' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Era</Text>
                  <Text style={styles.tabText2}>
                    {place?.historicalContext?.historical_era || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Architectural Style</Text>
                  <Text style={styles.tabText2}>
                    {place?.historicalContext?.architectural_style || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Built In</Text>
                  <Text style={styles.tabText2}>
                    {place?.historicalContext?.year_established || 'N/A'}
                  </Text>
                </View>
              </View>
            )}

            {activeTab === 'Sub Location' && (
              <View style={styles.tabInfoView}>
                {place?.subLocations?.length > 0 ? (
                  place.subLocations.map((loc, index) => (
                    <View key={index} style={styles.tabInfoView1}>
                      <Text style={styles.tabText1}>
                        {loc.name || `Sub Location ${index + 1}`}
                      </Text>
                      <Text style={styles.tabText2}>
                        {loc.description || 'No description'}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.tabInfoView1}>
                    <Text style={styles.tabText1}>No Sub Locations</Text>
                    <Text style={styles.tabText2}>
                      There are no sub locations listed for this place.
                    </Text>
                  </View>
                )}
              </View>
            )}

            {place?.subLocations?.length > 0 && (
              <View
                style={[
                  styles.sectionContainer,
                  { marginTop: 30, paddingHorizontal: 0 },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    { paddingHorizontal: 16, marginBottom: 12 },
                  ]}
                >
                  Sub Locations
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={place.subLocations}
                  contentContainerStyle={[
                    styles.subLocationCarouselContent,
                    { paddingHorizontal: 16 },
                  ]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.subLocationCard}>
                      <Image
                        source={{
                          uri:
                            item.image ||
                            (place.images && place.images.length > 0
                              ? place.images[index % place.images.length]
                              : 'https://via.placeholder.com/150'),
                        }}
                        style={styles.subLocationImage}
                      />
                      <View style={styles.subLocationTextContainer}>
                        <Text style={styles.subLocationTitle} numberOfLines={1}>
                          {item.name || `Sub Location ${index + 1}`}
                        </Text>
                        <Text style={styles.subLocationDesc} numberOfLines={2}>
                          {item.description || 'No description'}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.addTripBtn}
              activeOpacity={0.8}
              onPress={() => setAddTripModalVisible(true)}
            >
              <Text style={styles.addTripBtnText}>Add Trip</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            visible={addTripModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setAddTripModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Trip</Text>

                <TextInput
                  style={styles.modalInput}
                  placeholder="Number of People"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="numeric"
                  value={tripPeople}
                  onChangeText={setTripPeople}
                />

                <TextInput
                  style={styles.modalInput}
                  placeholder="Start Date (YYYY-MM-DD)"
                  placeholderTextColor={colors.textTertiary}
                  value={tripStart}
                  onChangeText={setTripStart}
                />

                <TextInput
                  style={styles.modalInput}
                  placeholder="End Date (YYYY-MM-DD)"
                  placeholderTextColor={colors.textTertiary}
                  value={tripEnd}
                  onChangeText={setTripEnd}
                />

                {place?.subLocations?.length > 0 && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={[styles.labelText, { marginBottom: 8 }]}>
                      Select Sublocations:
                    </Text>
                    {place.subLocations.map((loc, idx) => {
                      const locName = loc.name || `Sub Location ${idx + 1}`;
                      const isSelected = tripSublocations.includes(locName);
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={styles.checkboxRow}
                          activeOpacity={0.7}
                          onPress={() => toggleSublocation(locName)}
                        >
                          <View
                            style={[
                              styles.checkboxOuter,
                              isSelected && styles.checkboxOuterSelected,
                            ]}
                          >
                            {isSelected && (
                              <View style={styles.checkboxInner} />
                            )}
                          </View>
                          <Text style={styles.checkboxLabel}>{locName}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                <View style={styles.modalActionRow}>
                  <TouchableOpacity
                    style={[styles.modalBtn, styles.cancelBtn]}
                    onPress={() => setAddTripModalVisible(false)}
                    disabled={isAddingTrip}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalBtn, styles.confirmBtn]}
                    onPress={handleAddTripSubmit}
                    disabled={isAddingTrip}
                  >
                    {isAddingTrip ? (
                      <ActivityIndicator
                        color={colors.textOnPrimary}
                        size="small"
                      />
                    ) : (
                      <Text style={styles.confirmBtnText}>Confirm</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
