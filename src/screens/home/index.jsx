import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useHome } from './home.hooks';
import { createStyles } from './home.styles';
import { useTheme } from '../../context';

// Home-specific components
import HomeHeader from './components/HomeHeader';
import SearchBar from './components/SearchBar';
import PromoCarousel from './components/PromoCarousel';
import CategoryFilter from './components/CategoryFilter';
import PlaceCard from './components/PlaceCard';
import PopularCategoriesSection from './components/PopularCategoriesSection';
import HomeSkeleton from './components/HomeSkeleton';

// Shared components
import { SectionHeader } from '../../components';
import { useNotifications } from '../../context';

const Home = ({ navigation }) => {
  const {
    filteredPosts,
    categories,
    activeCategory,
    setActiveCategory,
    searchText,
    handleSearchSubmit,
    handleSearchChange,
    loading,
    loadingMore,
    refreshing,
    loadMoreSites,
    handleRefresh,
    userImage,
  } = useHome(navigation);

  const { unreadCount } = useNotifications();
  const { isDarkMode, colors } = useTheme();
  const styles = React.useMemo(
    () => createStyles(colors, isDarkMode),
    [colors, isDarkMode],
  );

  // ── List header (everything above the place cards) ──────────────────
  const ListHeader = React.useCallback(
    () => (
      <>
        <HomeHeader
          userImage={userImage}
          unreadCount={unreadCount}
          onBellPress={() => navigation.navigate('Notifications')}
        />
        <SearchBar
          value={searchText}
          onChangeText={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <PromoCarousel />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <View style={styles.popularWrapper}>
          <PopularCategoriesSection />
        </View>
        <View style={styles.recommendedHeader}>
          <SectionHeader title="Recommended Places" />
        </View>
      </>
    ),
    [
      searchText,
      handleSearchChange,
      handleSearchSubmit,
      categories,
      activeCategory,
      styles,
      setActiveCategory,
      navigation,
      unreadCount,
      userImage,
    ],
  );

  // ── List footer (pagination loader) ────────────
  const ListFooter = React.useCallback(
    () => (
      <View>
        {loadingMore && (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#FF6B35" />
          </View>
        )}
      </View>
    ),
    [loadingMore, styles.footerLoader],
  );

  if (loading) {
    return (
      <GestureHandlerRootView style={styles.rootView}>
        <HomeSkeleton />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.cardsPadding}>
                <PlaceCard
                  item={item}
                  onPress={(place) =>
                    navigation.navigate('PlaceDetail', { id: place.id })
                  }
                />
              </View>
            )}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreSites}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#FF6B35']}
                tintColor="#FF6B35"
              />
            }
          />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
