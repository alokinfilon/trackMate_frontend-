import { useState, useEffect } from 'react';
import { useAlertModal } from '../../../../components/index';
import apiClient from '../../../../services/apiClient';
import { FALLBACK_PREFERENCES, strings } from './travel-preference.strings';

export const useTravelPreference = (navigation) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState(FALLBACK_PREFERENCES);
  const [selections, setSelections] = useState({
    fav_country: [],
    dream_destination: [],
    travel_budget: [],
    trip_type_preference: [],
    travel_history: [],
    language_spoken: [],
    interest_hobbies: [],
    seasonal_preference: [],
    travel_frequency: [],
    travel_preference: []
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { showModal } = useAlertModal();

  // Fetch travel preferences & user saved choices from API on load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all categories options
        const optResponse = await apiClient('/api/travel-preferences');
        if (optResponse.ok) {
          const optData = await optResponse.json();
          if (Array.isArray(optData) && optData.length > 0) {
            const enriched = optData.map(apiCat => {
              const fallbackCat = FALLBACK_PREFERENCES.find(f => f.category === apiCat.category);
              return {
                ...apiCat,
                title: fallbackCat ? fallbackCat.title : apiCat.category.replace(/_/g, ' '),
                subtitle: fallbackCat ? fallbackCat.subtitle : 'Choose your options',
                options: apiCat.options.map(apiOpt => {
                  const fallbackOpt = fallbackCat?.options.find(fo => fo.id === apiOpt.id || fo.label === apiOpt.label);
                  return {
                    ...apiOpt,
                    emoji: fallbackOpt ? fallbackOpt.emoji : '✈️'
                  };
                })
              };
            });
            setCategories(enriched);
          }
        }

        // Fetch user's saved preferences
        const savedResponse = await apiClient('/auth/preferences');
        if (savedResponse.ok) {
          const savedData = await savedResponse.json();
          if (savedData.success && savedData.data) {
            const dataObj = savedData.data;
            setSelections(prev => ({
              fav_country: dataObj.fav_country || prev.fav_country,
              dream_destination: dataObj.dream_destination || prev.dream_destination,
              travel_budget: dataObj.travel_budget || prev.travel_budget,
              trip_type_preference: dataObj.trip_type_preference || prev.trip_type_preference,
              travel_history: dataObj.travel_history || prev.travel_history,
              language_spoken: dataObj.language_spoken || prev.language_spoken,
              interest_hobbies: dataObj.interest_hobbies || prev.interest_hobbies,
              seasonal_preference: dataObj.seasonal_preference || prev.seasonal_preference,
              travel_frequency: dataObj.travel_frequency || prev.travel_frequency,
              travel_preference: dataObj.travel_preference || prev.travel_preference,
            }));
          }
        }
      } catch (err) {
        console.warn("Failed to synchronize preferences with server:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activeCategory = categories[currentStep] || {};

  const toggleOption = (optionLabel) => {
    const catName = activeCategory.category;
    if (!catName) return;

    // List of single-select categories
    const isSingleSelect = [
      'travel_budget',
      'travel_history',
      'travel_frequency',
      'travel_preference'
    ].includes(catName);

    const currentList = selections[catName] || [];

    if (isSingleSelect) {
      // Replace with array containing only the selected label
      setSelections({
        ...selections,
        [catName]: currentList.includes(optionLabel) ? [] : [optionLabel]
      });
    } else {
      // Multi-select toggle
      if (currentList.includes(optionLabel)) {
        setSelections({
          ...selections,
          [catName]: currentList.filter(item => item !== optionLabel)
        });
      } else {
        setSelections({
          ...selections,
          [catName]: [...currentList, optionLabel]
        });
      }
    }
  };

  const handleNext = async () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the selection data
      setSubmitting(true);
      try {
        const response = await apiClient('/auth/preferences', {
          method: 'PUT',
          body: JSON.stringify(selections)
        });

        if (response.ok) {
          showModal({
            title: strings.successTitle,
            message: strings.successMsg,
            variant: 'success',
            confirmText: 'Awesome',
            onConfirm: () => {
              navigation.goBack();
            }
          });
        } else {
          const errorData = await response.json().catch(() => ({}));
          showModal({
            title: 'Submission Failed',
            message: errorData.message || 'Server encountered an error saving your preferences.',
            variant: 'error',
            confirmText: 'Try Again'
          });
        }
      } catch (err) {
        showModal({
          title: 'Connection Error',
          message: 'Could not connect to server. Please check your internet connection.',
          variant: 'error',
          confirmText: 'OK'
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return {
    currentStep,
    categories,
    activeCategory,
    selections,
    loading,
    submitting,
    toggleOption,
    handleNext,
    handleBack
  };
};
