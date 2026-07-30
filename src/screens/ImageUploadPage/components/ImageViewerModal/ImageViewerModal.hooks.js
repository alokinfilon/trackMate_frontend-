import { useMemo } from 'react';
import { createStyles } from './ImageViewerModal.styles';

export const useImageViewerModal = () => {
  const styles = useMemo(() => createStyles(), []);

  return { styles };
};
