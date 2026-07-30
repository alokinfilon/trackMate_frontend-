import { useState } from 'react';
import { Alert } from 'react-native';

export const useHelpSupport = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      Alert.alert('Message Sent', 'Support has received your message and will respond shortly.');
      setMessage('');
    }, 1000);
  };

  return {
    message,
    setMessage,
    sending,
    showContactForm,
    setShowContactForm,
    handleSendMessage,
  };
};
