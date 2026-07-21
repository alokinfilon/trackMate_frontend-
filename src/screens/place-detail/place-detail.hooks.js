
import { useState, useEffect, useContext } from 'react';
import { CAROUSEL_WIDTH } from './place-detail.styles';
import { AuthContext } from '../../context/AuthContext'; 

import { useAlertModal } from '../../components/index';

export function useProductDetails(route, navigation) {
  const { locationId, id } = route.params || {};
  const targetId = id || locationId;

  const [place, setPlace] = useState(null);
  const [activeTab, setActiveTab] = useState('Trivia and Culture');
  const [wholeLookChecked, setWholeLookChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { showModal } = useAlertModal();
  const { setUserIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (targetId) {
      fetchLocationDetails(targetId);
    }
  }, [targetId]);

  const fetchLocationDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://trackmate-x7ue.onrender.com/locations?page=1&limit=30`);
      const json = await response.json();

      const sites = json.historicalSites || [];
      const foundPlace = sites.find(site => site.location_id === String(id) || site._id === String(id));

      if (foundPlace) {
        setPlace({
          id: foundPlace.location_id || foundPlace._id,
          name: foundPlace.name,
          description: foundPlace.description,
          images: foundPlace.media?.gallery || [],
          heroImage: foundPlace.media?.hero_image_url || null,
          location: `${foundPlace.geography?.city}, ${foundPlace.geography?.state}`,
          rating: foundPlace.overall_rating || null,
          
          amenities: foundPlace.amenities || {},
          historicalContext: foundPlace.historical_context || {},
          trivia: foundPlace.trivia_and_culture || {},
          logistics: foundPlace.logistics || {},
          subLocations: foundPlace.sub_locations || [],
          geography: foundPlace.geography || {},
        });

        
      }
    } catch (error) {
      console.error("Failed to fetch location details:", error);
      showModal("Error", "Could not load location details.");
    } finally {
      setLoading(false);
    }
  };
 console.log('====================================');
        console.log(place);
        console.log('====================================');
  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation) {
      navigation.replace('HomeTab');
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
    setActiveIndex(index);
  };

  return {
    place,
    loading,
    activeIndex,
    activeTab,
    setActiveTab,
    handleGoBack,
    handleScroll,
    wholeLookChecked,
    setWholeLookChecked,
    showModal
  };
}
