import { useTranslation } from '../../../../context/LanguageContext';

export const useLanguage = () => {
  const { locale, changeLanguage } = useTranslation();

  return {
    selectedLang: locale,
    setSelectedLang: changeLanguage,
  };
};
