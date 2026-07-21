import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useHome } from './home.hooks';
import { createStyles, CAROUSEL_WIDTH } from './home.styles';
import { useTheme } from '../../context/ThemeContext';
import { strings } from './home.strings';
import {BlurView} from '@react-native-community/blur'
const Home = ({ navigation }) => {
  const {
    posts,
    loading,
    activeImageIndices,
    handleCarouselScroll
  } = useHome(navigation);

  const { isDarkMode, colors, gradients } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const renderPostCard = ({ item: postItem }) => {
    const currentActiveIndex = activeImageIndices[postItem.id] || 0;

    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => navigation.navigate('PlaceDetail', { id: postItem.id })}
      >
        <LinearGradient
          colors={[colors.card, colors.card]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.postCardOuterFrame}
        >
          <View style={styles.imageDisplayContainer}>
          <FlatList
            data={postItem.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CAROUSEL_WIDTH}
            decelerationRate="fast"
            keyExtractor={(imgUrl, idx) => `${postItem.id}-img-${idx}`}
            onScroll={e => handleCarouselScroll(postItem.id, e)}
            scrollEventThrottle={16}
            renderItem={({ item: imageUrl }) => (
              <Image
                source={{ uri: imageUrl }}
                style={styles.mainPostMediaImage}
                resizeMode="cover"
              />
            )}
          />

          <View style={styles.mediaCarouselIndicatorTrack}>
            {postItem.images.map((_, dotIndex) => {
              if (dotIndex === currentActiveIndex) {
                return (
                  <LinearGradient
                    key={dotIndex}
                    colors={['#FEF9BD', '#FA83F2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.indicatorDotActive}
                  />
                );
              }
              return (
                <View key={dotIndex} style={styles.indicatorDotInactive} />
              );
            })}
          </View>
        </View>

        <View style={styles.postContentContainerDescriptionBlock}>
          <View style={styles.descriptionHeaderTitleWrapperRow}>
            <Text style={styles.mainDescriptionTitleText} numberOfLines={2}>
              {postItem.name}
            </Text>
            {postItem.rating && (
              <Text style={styles.metricLabelValueStringText}>
                ★ {postItem.rating}
              </Text>
            )}
          </View>
          <Text style={styles.metricLabelValueStringText} numberOfLines={3}>
            {postItem.description}
          </Text>
        </View>
      </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainerWrapper}>
      <View style={styles.topNavigationHeaderModuleOuterContainer}>
        <Text style={styles.screenHeaderTitleMainText}>{strings.header.title}</Text>
      </View>
    </View>
  );

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
          {loading ? (
            <View style={styles.centerSpinnerLoaderViewFrame}>
              <ActivityIndicator size="large" color="#F8876C" />
            </View>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPostCard}
              keyExtractor={item => item.id}
              ListHeaderComponent={renderHeader}
              contentContainerStyle={
                styles.socialFeedScrollContentContainerSpacingPadding
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default Home;
