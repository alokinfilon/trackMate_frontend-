import { useTranslation } from '../../../../context';

export const useLanguage = () => {
  const { locale, changeLanguage } = useTranslation();

  return {
    selectedLang: locale,
    setSelectedLang: changeLanguage,
  };
};
