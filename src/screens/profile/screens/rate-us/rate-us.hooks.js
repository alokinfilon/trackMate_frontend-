import { useState } from 'react';
import { Alert } from 'react-native';

export const useRateUs = (navigation) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const submitRating = () => {
    if (rating === 0) {
      Alert.alert('Selection Required', 'Please select a star rating first.');
      return;
    }
    Alert.alert(
      'Thank you!',
      'We appreciate your feedback. It helps us improve TrackMate.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return {
    rating,
    setRating,
    feedback,
    setFeedback,
    submitRating,
  };
};
