import { useState, useEffect } from 'react';
import { CAROUSEL_WIDTH } from './place-detail.styles';

export function useProductDetails(route, navigation) {
    const locationId = route?.params?.id;

    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        if (locationId) {
            fetchLocationDetails(locationId);
        }
    }, [locationId]);

    const fetchLocationDetails = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`https://trackmate-x7ue.onrender.com/locations`);
            const json = await response.json();

            if (json && json.historicalSites) {
                const foundPlace = json.historicalSites.find(site => String(site._id) === String(id) || String(site.location_id) === String(id));
                if (foundPlace) {
                    setPlace({
                        id: foundPlace.location_id || foundPlace._id,
                        name: foundPlace.name,
                        description: foundPlace.description,
                        images: foundPlace.images || [],
                        location: foundPlace.location,
                        rating: foundPlace.rating || null,
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch location details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        if (navigation) {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.replace('HomeTab');
            }
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
        handleScroll
    };
}