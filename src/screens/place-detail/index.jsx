import React, { useState, useEffect, useMemo } from 'react';
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
  TextInput,
  Platform,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Arrow as ArrowLeftIcon, HeartIcon, Skeleton, CalendarModal, AppModal } from '../../components';
import { apiClient } from '../../services';
import { createStyles } from './place-detail.styles';
import { useProductDetails } from './place-detail.hooks';
import { useTheme } from '../../context';

const getTodayStr = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateVisual = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = MONTHS[monthIdx] || parts[1];
  
  return `${day} ${monthName} ${year}`;
};

export default function PlaceDetails({ route, navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  
  const {
    place,
    loading,
    activeTab,
    setActiveTab,
    handleGoBack,
  } = useProductDetails(route, navigation);

  const [addTripModalVisible, setAddTripModalVisible] = useState(false);
  const [tripPeople, setTripPeople] = useState('2');
  const [tripStart, setTripStart] = useState(getTodayStr(0));
  const [tripEnd, setTripEnd] = useState(getTodayStr(5));
  const [isAddingTrip, setIsAddingTrip] = useState(false);

  const [startCalendarVisible, setStartCalendarVisible] = useState(false);
  const [endCalendarVisible, setEndCalendarVisible] = useState(false);

  // Custom states for interactive detail screen
  const [activeHeroImage, setActiveHeroImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Sync activeHeroImage when place loads
  useEffect(() => {
    if (place) {
      setActiveHeroImage(place.heroImage || (place.images && place.images[0]) || null);
    }
  }, [place]);

  const openMapInDevice = () => {
    if (!place) return;
    const query = encodeURIComponent(`${place.name}, ${place.location || ''}`);
    const url = Platform.select({
      ios: `maps://?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`
    });
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
        }
      })
      .catch(() => {
        Alert.alert("Error", "Could not open map.");
      });
  };

  const handleAddTripSubmit = async () => {
    if (tripStart && tripEnd) {
      const start = new Date(tripStart);
      const end = new Date(tripEnd);
      if (start > end) {
        Alert.alert('Validation Error', 'Start date must be less than or equal to the end date.');
        return;
      }
    }

    try {
      setIsAddingTrip(true);

      const payload = {
        location_id: place?.id || '',
        sublocation: [],
        price: totalPrice,
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

  // Spec card calculations (mocked values aligned with place values)
  const placeNameLength = place?.name?.length || 10;
  const mockDistance = placeNameLength ? `${(placeNameLength % 8) + 8} Km` : '8 Km';
  const mockTemp = placeNameLength ? `${(placeNameLength % 10) + 16}° C` : '20° C';
  const mockRating = place?.rating ? parseFloat(place.rating).toFixed(1) : '4.5';
  
  const basePrice = (placeNameLength * 98) + 3150;
  const mockPrice = `₹${basePrice}`;

  const totalPrice = useMemo(() => {
    const start = new Date(tripStart);
    const end = new Date(tripEnd);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const people = parseInt(tripPeople, 10) || 1;
    return basePrice * diffDays * people;
  }, [tripStart, tripEnd, tripPeople, basePrice]);

  if (loading || !place) {
    return (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Curved Hero Section Placeholder */}
            <View style={styles.heroWrapper}>
              {/* Back button placeholder overlay */}
              <View style={styles.headerButtonsRow}>
                <Skeleton width={42} height={42} borderRadius={21} />
                <Skeleton width={42} height={42} borderRadius={21} />
              </View>
              {/* Hero title placeholder at the bottom overlay */}
              <View style={styles.titleOverlay}>
                <Skeleton width={200} height={28} />
                <View style={styles.locationRow}>
                  <Skeleton width={130} height={13} />
                </View>
              </View>
            </View>

            {/* Specs placeholder */}
            <View style={styles.specsContainer}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={styles.specCard}>
                  <Skeleton width={40} height={12} style={styles.marginBottom6} />
                  <Skeleton width={60} height={16} />
                </View>
              ))}
            </View>

            {/* Description Section Placeholder */}
            <View style={styles.descriptionContainer}>
              <Skeleton width={120} height={18} style={styles.marginBottom12} />
              <Skeleton width="100%" height={14} style={styles.marginBottom8} />
              <Skeleton width="95%" height={14} style={styles.marginBottom8} />
              <Skeleton width="85%" height={14} style={styles.marginBottom8} />
            </View>

            {/* Tabs Area Placeholder */}
            <View style={styles.tabsContainer}>
              <View style={styles.tabButtonsRow}>
                {[1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.tabButton,
                      i === 1 ? styles.tabActiveButton : styles.tabInactiveButton
                    ]}
                  >
                    <Skeleton width={70} height={14} />
                  </View>
                ))}
              </View>
              <View style={styles.tabContentWrapper}>
                <Skeleton width={130} height={15} style={styles.marginBottom12} />
                <Skeleton width="100%" height={13} style={styles.marginBottom8} />
                <Skeleton width="90%" height={13} style={styles.marginBottom8} />
              </View>
            </View>
          </ScrollView>

          {/* Sticky Bottom Bar Placeholder */}
          <View style={styles.bottomStickyBar}>
            <View style={styles.priceBlock}>
              <Skeleton width={60} height={12} style={styles.marginBottom4} />
              <Skeleton width={100} height={22} />
            </View>
            <Skeleton width={52} height={52} borderRadius={26} />
          </View>
        </View>
      </View>
    );
  }

  // Construct images list (Hero + gallery)
  const allImages = place.heroImage ? [place.heroImage, ...place.images] : place.images || [];
  const thumbnails = allImages.slice(0, 4);

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* ── Curved Hero Section ── */}
            <View style={styles.heroWrapper}>
              {activeHeroImage && (
                <Image
                  source={{ uri: activeHeroImage }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              )}

              {/* Dark Gradient Overlay for White Text Legibility */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
                style={styles.gradientOverlay}
              />

              {/* Top Navigation Overlay */}
              <View style={styles.headerButtonsRow}>
                <TouchableOpacity
                  style={styles.circularButton}
                  onPress={handleGoBack}
                  activeOpacity={0.7}
                >
                  <ArrowLeftIcon
                    size={20}
                    color={isDarkMode ? '#FFFFFF' : '#333333'}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.circularButton}
                  onPress={() => setIsLiked(!isLiked)}
                  activeOpacity={0.7}
                >
                  <HeartIcon
                    size={20}
                    color={isLiked ? '#FF4B4B' : (isDarkMode ? '#FFFFFF' : '#333333')}
                    fill={isLiked ? '#FF4B4B' : 'none'}
                    strokeWidth={2.2}
                  />
                </TouchableOpacity>
              </View>

              {/* Place Name and Location Subtitle */}
              <View style={styles.titleOverlay}>
                <Text style={styles.placeTitle} numberOfLines={2}>
                  {place.name}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={14} color="#FF6B35" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {place.location || place.geography?.address || 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Floating Vertical Thumbnail Column */}
              {thumbnails.length > 1 && (
                <View style={styles.floatingGallery}>
                  {thumbnails.map((uri, idx) => {
                    const isActive = activeHeroImage === uri;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.thumbWrapper,
                          isActive ? styles.thumbActive : styles.thumbInactive
                        ]}
                        onPress={() => setActiveHeroImage(uri)}
                        activeOpacity={0.8}
                      >
                        <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* ── Specs Cards Section ── */}
            <View style={styles.specsContainer}>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>Distance</Text>
                <Text style={styles.specValue}>{mockDistance}</Text>
              </View>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>Temp</Text>
                <Text style={styles.specValue}>{mockTemp}</Text>
              </View>
              <View style={styles.specCard}>
                <Text style={styles.specLabel}>Rating</Text>
                <Text style={styles.specValue}>{mockRating}</Text>
              </View>
            </View>

            {/* ── Description Section ── */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text
                style={styles.descriptionText}
                numberOfLines={isDescriptionExpanded ? undefined : 3}
              >
                {place.description}
              </Text>
              {place.description && place.description.length > 130 && (
                <TouchableOpacity
                  style={styles.readMoreBtn}
                  onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.readMoreText}>
                    {isDescriptionExpanded ? 'Read Less' : 'Read More...'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* ── Location Map Section ── */}
            <View style={styles.mapSectionContainer}>
              <Text style={styles.sectionTitle}>Location Map</Text>
              <TouchableOpacity
                style={styles.mapCard}
                activeOpacity={0.9}
                onPress={openMapInDevice}
              >
                <Image
                  source={
                    isDarkMode
                      ? require('../../../assets/dark_map.png')
                      : require('../../../assets/light_map.png')
                  }
                  style={styles.mapImage}
                  resizeMode="cover"
                />

                {/* Floating Map Pin Marker */}
                <View style={styles.mapMarkerContainer}>
                  <View style={styles.markerCircle}>
                    <Ionicons name="location" size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.markerPulse} />
                </View>

                {/* Google Maps style Info Box overlay in top-left */}
                <View style={styles.mapInfoBox}>
                  <View style={styles.mapInfoTextWrapper}>
                    <Text numberOfLines={1} style={styles.mapInfoTitle}>
                      {place.name || 'New York'}
                    </Text>
                    <Text numberOfLines={1} style={styles.mapInfoSubtitle}>
                      {place.location || 'New York, USA'}
                    </Text>
                    <Text style={styles.mapInfoLink}>View larger map</Text>
                  </View>
                  <View style={styles.mapInfoDirectionsBtn}>
                    <Ionicons name="navigate" size={12} color="#FFFFFF" />
                  </View>
                </View>

                {/* Google Maps style Zoom buttons in bottom-right */}
                <View style={styles.zoomControls}>
                  <View style={[styles.zoomBtn, styles.zoomBtnBorder]}>
                    <Text style={styles.zoomText}>+</Text>
                  </View>
                  <View style={styles.zoomBtn}>
                    <Text style={styles.zoomText}>-</Text>
                  </View>
                </View>

                {/* Google Mock Branding in bottom-left */}
                <View style={styles.googleBranding}>
                  <Text style={styles.googleText}>Google</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* ── Detailed Tabs Area ── */}
            <View style={styles.tabsContainer}>
              <View style={styles.tabButtonsRow}>
                {['Trivia and Culture', 'Historical Context', 'Sub Location'].map(tab => {
                  const isActive = activeTab === tab;
                  return (
                    <TouchableOpacity
                      key={tab}
                      style={[
                        styles.tabButton,
                        isActive ? styles.tabActiveButton : styles.tabInactiveButton
                      ]}
                      onPress={() => setActiveTab(tab)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.tabButtonText,
                          isActive ? styles.tabActiveText : styles.tabInactiveText
                        ]}
                      >
                        {tab === 'Trivia and Culture' ? 'Trivia' : tab === 'Historical Context' ? 'History' : 'Sub-Locations'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Tab Content rendering */}
              <View style={styles.tabContentWrapper}>
                {activeTab === 'Trivia and Culture' && (
                  <View style={styles.tabInfoView}>
                    {/* Hidden Gem Tip Card */}
                    <View style={styles.gemCard}>
                      <View style={styles.gemIconContainer}>
                        <Ionicons name="sparkles" size={16} color="#FF6B35" />
                      </View>
                       <View style={styles.flex1}>
                        <Text style={styles.gemTitle}>Customs & Hidden Gems</Text>
                        <Text style={styles.gemText}>
                          {place.trivia?.hidden_gem || 'No customs information available.'}
                        </Text>
                      </View>
                    </View>

                    {/* Quick Facts list with bullet points */}
                    {place.trivia?.quick_facts?.length > 0 && (
                      <View style={styles.marginTop8}>
                        <Text style={styles.factsHeader}>Quick Facts</Text>
                        {place.trivia.quick_facts.map((fact, idx) => (
                          <View key={idx} style={styles.factRow}>
                            <Ionicons name="bulb-outline" size={16} color="#FF6B35" style={styles.marginTop4} />
                            <Text style={styles.factText}>{fact}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                {activeTab === 'Historical Context' && (
                  <View style={styles.tabInfoView}>
                    <View style={styles.tabInfoItem}>
                      <Text style={styles.tabInfoLabel}>Historical Era</Text>
                      <Text style={styles.tabInfoValue}>
                        {place.historicalContext?.historical_era || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.tabInfoItem}>
                      <Text style={styles.tabInfoLabel}>Architectural Style</Text>
                      <Text style={styles.tabInfoValue}>
                        {place.historicalContext?.architectural_style || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.tabInfoItem}>
                      <Text style={styles.tabInfoLabel}>Year Established</Text>
                      <Text style={styles.tabInfoValue}>
                        {place.historicalContext?.year_established || 'N/A'}
                      </Text>
                    </View>
                  </View>
                )}

                {activeTab === 'Sub Location' && (
                  <View style={styles.tabInfoView}>
                    {place.subLocations?.length > 0 ? (
                      place.subLocations.map((loc, index) => (
                        <View key={index} style={styles.tabInfoItem}>
                          <Text style={styles.tabInfoLabel}>{loc.name || `Sub Location ${index + 1}`}</Text>
                          <Text style={styles.tabInfoValue}>{loc.description || 'No description'}</Text>
                        </View>
                      ))
                    ) : (
                      <View style={styles.tabInfoItem}>
                        <Text style={styles.tabInfoLabel}>No Sub Locations</Text>
                        <Text style={styles.tabInfoValue}>
                          There are no sub locations listed for this place.
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>

            {/* ── Sub-locations Horizontal Carousel ── */}
            {place.subLocations?.length > 0 && (
              <View style={styles.subLocationsWrapper}>
                <Text style={[styles.sectionTitle, styles.subLocationSectionTitle]}>
                  Explore Sub Locations
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={place.subLocations}
                  contentContainerStyle={styles.subLocationCarouselContent}
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
                        resizeMode="cover"
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
          </ScrollView>

          {/* ── Sticky Bottom Cost & Action Bar ── */}
          <View style={styles.bottomStickyBar}>
            <View style={styles.priceBlock}>
              <Text style={styles.priceLabel}>Estimated Cost</Text>
              <Text style={styles.priceAmount}>{mockPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.actionChevronButton}
              activeOpacity={0.85}
              onPress={() => setAddTripModalVisible(true)}
            >
              <Text style={styles.actionButtonText}>Plan Trip</Text>
              <ArrowLeftIcon
                size={16}
                color="#FFFFFF"
                strokeWidth={3}
                style={{ transform: [{ rotate: '180deg' }] }} // Rotates left arrow to point right
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Add Trip Modal ── */}
        <AppModal
          title="Plan Trip"
          visible={addTripModalVisible}
          onClose={() => setAddTripModalVisible(false)}
        >
          <TextInput
            style={styles.modalInput}
            placeholder="Number of People"
            placeholderTextColor={colors.textTertiary}
            keyboardType="numeric"
            value={tripPeople}
            onChangeText={setTripPeople}
          />

          {/* Start Date Picker Button */}
          <TouchableOpacity
            style={[styles.modalInput, styles.modalInputTouchable]}
            activeOpacity={0.8}
            onPress={() => setStartCalendarVisible(true)}
          >
            <Text style={tripStart ? styles.modalInputText : styles.modalInputPlaceholder}>
              {tripStart ? `Start Date: ${formatDateVisual(tripStart)}` : 'Select Start Date'}
            </Text>
          </TouchableOpacity>

          {/* End Date Picker Button */}
          <TouchableOpacity
            style={[styles.modalInput, styles.modalInputTouchable]}
            activeOpacity={0.8}
            onPress={() => setEndCalendarVisible(true)}
          >
            <Text style={tripEnd ? styles.modalInputText : styles.modalInputPlaceholder}>
              {tripEnd ? `End Date: ${formatDateVisual(tripEnd)}` : 'Select End Date'}
            </Text>
          </TouchableOpacity>

          {/* Display Total Price */}
          <Text style={[styles.labelText, styles.marginBottom14]}>
            Total Price: ₹{totalPrice}
          </Text>

          {/* Start Date Calendar Modal */}
          <CalendarModal
            visible={startCalendarVisible}
            onClose={() => setStartCalendarVisible(false)}
            onSelectDate={setTripStart}
            initialDate={tripStart}
          />

          {/* End Date Calendar Modal */}
          <CalendarModal
            visible={endCalendarVisible}
            onClose={() => setEndCalendarVisible(false)}
            onSelectDate={setTripEnd}
            initialDate={tripEnd}
          />

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
                  color="#FFFFFF"
                  size="small"
                />
              ) : (
                <Text style={styles.confirmBtnText}>Plan Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </AppModal>
      </View>
  );
}
