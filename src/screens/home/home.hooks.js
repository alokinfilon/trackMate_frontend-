import { useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

import { useAlertModal } from '../../components/index';
import authService from '../../services/authService';
import apiClient from '../../services/apiClient';

export const useHome = (navigation) => {
  const { showModal } = useAlertModal();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { setUserIsAuthenticated } = useContext(AuthContext);
  const [activeImageIndices, setActiveImageIndices] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const LIMIT = 30;

  const fetchHistoricalSites = useCallback((targetPage = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    apiClient(`/locations?page=${targetPage}&limit=${LIMIT}`)
      .then(response => response.json())
      .then(json => {
        const rawList = json && (json.historicalSites || json.data || (Array.isArray(json) ? json : []));

        if (rawList && rawList.length > 0) {
          const formattedLocations = rawList.map(site => {
            const rawGallery = site.media && site.media.gallery ? site.media.gallery : [];
            const heroImg = site.media && site.media.hero_image_url ? site.media.hero_image_url : null;
            let allImages = heroImg ? [heroImg, ...rawGallery] : [...rawGallery];

            const exactFourImages = [];
            const fallbackImage = heroImg || 'https://placeholder.com';

            for (let i = 0; i < 4; i++) {
              if (allImages[i]) {
                exactFourImages.push(allImages[i]);
              } else {
                exactFourImages.push(fallbackImage);
              }
            }

            return {
              id: site.location_id,
              name: site.name,
              category: site.category,
              description: site.description,
              rating: site.overall_rating,
              images: exactFourImages,
              heroImage: heroImg,
              rawGallery: rawGallery,
              geography: site.geography || {},
              logistics: site.logistics || {},
              subLocations: site.sub_locations || [],
              historicalContext: site.historical_context || {},
              trivia: site.trivia_and_culture || [],
              reviews: site.reviews || [],
              amenities: site.amenities || {},
            };
          });

          setPosts(prev => append ? [...prev, ...formattedLocations] : formattedLocations);

          // If fewer items are returned than the limit, assume it's the end of the list
          if (rawList.length < LIMIT) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('Network data fetch operation failed:', error.message);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchHistoricalSites(1, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMoreSites = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    fetchHistoricalSites(nextPage, true);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    pageRef.current = 1;
    setHasMore(true);
    setPosts([]);
    setActiveCategory('All');
    setSearchQuery('');
    fetchHistoricalSites(1, false);
  }, [fetchHistoricalSites]);

  // Derived: unique categories from posts
  const categories = useMemo(() => {
    const unique = [...new Set(posts.map(p => p.category).filter(Boolean))];
    return ['All', ...unique];
  }, [posts]);

  // Derived: filtered posts by active category + search query
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.geography?.region && p.geography.region.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const handleLogoutPress = () => {
    showModal({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out of your account?',
      variant: 'warning',
      confirmText: 'Log Out',
      cancelText: 'Stay',
      onConfirm: async () => {
        try {
          await authService.logout();
          setUserIsAuthenticated(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpScreen' }],
          });
        } catch (error) {
          showModal({
            title: 'Logout Failed',
            message: error.message || 'Could not securely log out. Please try again.',
            variant: 'error',
          });
        }
      },
      onCancel: () => console.log('Logout cancelled by user'),
    });
  };

  const handleCarouselScroll = (postId, event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);

    if (activeImageIndices[postId] !== activeIndex) {
      setActiveImageIndices(prev => ({
        ...prev,
        [postId]: activeIndex,
      }));
    }
  };

  return {
    posts,
    filteredPosts,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    activeImageIndices,
    loadMoreSites,
    handleRefresh,
    handleLogoutPress,
    handleCarouselScroll
  };
};