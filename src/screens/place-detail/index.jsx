import React, { useState, useEffect, useContext  } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator
 
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NikeIcon from '../../components/svg/nikeIcon';
import HMIcon from '../../components/svg/h&mIcon';
import PlusIcon1 from '../../components/svg/plusGradientIcon'
import CustomButton from '../../components/customButton';

import {
  ArrowLeft,
  Home as HomeIcon,
  Image as CommunityIcon,
} from 'lucide-react-native';
import { Tokens } from '../../theme/theme';
import CheckMarkl from '../../components/svg/checkMarklIcon';
import ScaleInfoIcon from '../../components/svg/scaleInfoIcon';
import PlusIcon from '../../components/svg/plusIcon';
import MinusIcon from '../../components/svg/minusIcon';
import ArrowLeftIcon from '../../components/svg/arrow';
import authService from '../../services/authService';
import { useAlertModal } from '../../components/modal'; 
import { AuthContext } from '../../../App'; 






import { styles, CAROUSEL_WIDTH } from './place-detail.styles';
import { useProductDetails } from './place-detail.hooks';

export default function PlaceDetails({ route, navigation }) {
   const {
     place,
        loading,
        activeIndex,
        activeTab,
        setActiveTab,
        handleGoBack,
        handleScroll
   
  } = useProductDetails(route, navigation);

    if (loading ) {
        return (
            <LinearGradient colors={['#0F0F0F', '#0D0D0D']} style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#F8876C" />
            </LinearGradient>
        );
    }

   
  return (
    <SafeAreaProvider>
      <LinearGradient
       colors={['#ace9fd', '#ffffff']}
        start={{ x: 0.44, y: 0 }}
        end={{ x: 0.54, y: 0.98 }}
        style={styles.screenContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
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
                color="#000000"
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
                {place?.name || "Loading..."}
              </Text>
              <Text style={styles.productSubtitleText}>
                {place?.location || ""}
              </Text>
              <Text style={styles.categoryText}>
                Historical Site
              </Text>
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
              <Text style={styles.descriptionText}>
                {place?.description}
              </Text>
              {place?.rating && (
                <Text style={styles.ratingText}>
                  Rating: ★ {place.rating}
                </Text>
              )}
            </View>

            <View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Location</Text>
  
  {/* Address Line */}
  <Text style={styles.sectionBodyText}>
    <Text style={styles.labelText}>Address: </Text>
    <Text style={styles.answerText}>{place?.geography?.address || 'N/A'}</Text>
  </Text>

  {/* City Line */}
  <Text style={styles.sectionBodyText}>
    <Text style={styles.labelText}>City: </Text>
    <Text style={styles.answerText}>{place?.geography?.city || 'N/A'}</Text>
  </Text>

  {/* State Line */}
  <Text style={styles.sectionBodyText}>
    <Text style={styles.labelText}>State: </Text>
    <Text style={styles.answerText}>{place?.geography?.state || 'N/A'}</Text>
  </Text>

  {/* Country Line */}
  <Text style={styles.sectionBodyText}>
    <Text style={styles.labelText}>Country: </Text>
    <Text style={styles.answerText}>{place?.geography?.country || 'N/A'}</Text>
  </Text>
</View>


            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Logistics
              </Text>
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

            {/* {place?.images && place.images.length > 0 && (
              <View style={[styles.postBoxView, styles.gallerySectionContainer]}>
                <Text style={styles.galleryTitle}>
                  Sub Location Gallery
                </Text>
                <FlatList
                  data={place.images}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                  )}
                />
              </View>
            )} */}

            <View style={styles.Divider1} />

            <View style={styles.tabView}>
              {['Trivia and Culture', 'Historical Context', 'Sub Location'].map(tab => {
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
                        colors={['#ffffff', '#f6f4f4', '#fdfafa', '#f9f6f6']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.activeBorderGradientView}
                      >
                        <View style={styles.activeSolidBackgroundMaskShield}>
                          <LinearGradient
                            colors={['#082aef26', '#0df4ae1f', '#FBB49D1F']}
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
              })}
            </View>

            {activeTab === 'Trivia and Culture' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Customs & Hidden Gems</Text>
                  <Text style={styles.tabText2}>
                    {place?.trivia?.hidden_gem || 'No customs information available.'}
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Facts</Text>
                  <Text style={styles.tabText2}>
                    {place?.trivia?.quick_facts?.join('\n\n') || 'No facts available.'}
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
                      <Text style={styles.tabText1}>{loc.name || `Sub Location ${index + 1}`}</Text>
                      <Text style={styles.tabText2}>{loc.description || 'No description'}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.tabInfoView1}>
                    <Text style={styles.tabText1}>No Sub Locations</Text>
                    <Text style={styles.tabText2}>There are no sub locations listed for this place.</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}