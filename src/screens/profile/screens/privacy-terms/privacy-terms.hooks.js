import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import apiClient from '../../../../services/apiClient';

const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<h1>(.*?)<\/h1>/gi, '\n$1\n\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '\n$1\n\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n$1\n\n')
    .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<li>(.*?)<\/li>/gi, '• $1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
};

export const usePrivacyTerms = (type, title) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const endpoint = type === 'privacy-policy' ? '/api/privacy-policy' : '/api/terms';
        const res = await apiClient(endpoint);
        const text = await res.text();
        setContent(stripHtml(text));
      } catch (err) {
        console.error(`Failed to load ${type}:`, err);
        Alert.alert('Error', `Could not load ${title}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type, title]);

  return {
    content,
    loading,
  };
};
