import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../../services';
import { STATIC_FAQS } from './faq.strings';

export const useFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFaqs = useCallback(async (search = '') => {
    setLoading(true);
    try {
      const url = `/api/faqs${search ? `?search=${encodeURIComponent(search)}` : ''}`;
      const res = await apiClient(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.faqs)) {
        setFaqs(json.faqs);
      } else {
        setFaqs(STATIC_FAQS);
      }
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      setFaqs(STATIC_FAQS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFaqs(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchFaqs]);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return {
    faqs,
    loading,
    expandedIndex,
    toggleExpand,
    searchQuery,
    setSearchQuery,
  };
};
