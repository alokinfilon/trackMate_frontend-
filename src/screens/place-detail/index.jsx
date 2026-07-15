import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import ArrowLeftIcon from '../../components/svg/arrow';

import { styles, CAROUSEL_WIDTH } from './place-detail.styles';
import { useProductDetails } from './place-detail.hooks';
import { Tokens } from '../../theme/theme';

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

    if (loading || !place) {
        return (
            <LinearGradient colors={['#0F0F0F', '#0D0D0D']} style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#F8876C" />
            </LinearGradient>
        );
    }

    const images = place.images || [];

    return (
        <SafeAreaProvider>
            <LinearGradient colors={['#0F0F0F', '#0D0D0D']} style={styles.screenContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
                <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
                    <View style={styles.backHeaderView}>
                        <TouchableOpacity style={styles.backButtonView} onPress={handleGoBack} activeOpacity={0.7}>
                            <ArrowLeftIcon size={Tokens.scaleAsset(24)} color="#E5E5E5" strokeWidth={1.5} />
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
                        <View style={styles.headerView}>
                            <Text style={styles.productTitleText}>{place.name}</Text>
                            <Text style={styles.productSubtitleText}>{place.location}</Text>
                        </View>

                        {images.length > 0 && (
                            <View style={styles.postBoxView}>
                                <FlatList
                                    data={images}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <Image source={{ uri: item }} style={{ width: CAROUSEL_WIDTH, height: 389 }} resizeMode="cover" />}
                                />
                                {images.length > 1 && (
                                    <View style={styles.ImageCarousel}>
                                        {images.map((_, index) => index === activeIndex ? (
                                            <LinearGradient key={index} colors={['#FEF9BD', '#FA83F2']} style={styles.indicatorDotActive} />
                                        ) : (
                                            <View key={index} style={styles.indicatorDotInactive} />
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}

                        <View style={styles.priceView}>
                            {place.rating && (
                                <Text style={styles.priceText}>★ {place.rating}</Text>
                            )}
                        </View>

                        <View style={styles.Divider} />
                        
                        <View style={styles.tabView}>
                            <TouchableOpacity onPress={() => setActiveTab('Overview')} activeOpacity={0.85} style={styles.buttonWrapper}>
                                {activeTab === 'Overview' ? (
                                    <LinearGradient colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']} style={styles.activeBorderGradientView}>
                                        <View style={styles.activeSolidBackgroundMaskShield}>
                                            <LinearGradient colors={['#FDDBBD26', '#F77D611F', '#FBB49D1F']} style={styles.activeGredientView}>
                                                <Text style={styles.categoryTabText}>Overview</Text>
                                            </LinearGradient>
                                        </View>
                                    </LinearGradient>
                                ) : (
                                    <View style={styles.activeGredientView1}><Text style={styles.categoryTabText1}>Overview</Text></View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {activeTab === 'Overview' && (
                            <View style={styles.tabInfoView}>
                                <View style={styles.tabInfoView1}>
                                    <Text style={styles.tabText1}>About this place</Text>
                                    <Text style={styles.tabText2}>{place.description}</Text>
                                </View>
                            </View>
                        )}

                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    );
}