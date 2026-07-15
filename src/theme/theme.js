import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FIGMA_WIDTH_BASELINE = 412;
const scaleFactor = SCREEN_WIDTH / FIGMA_WIDTH_BASELINE;

export const Tokens = {
  layout: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    maxWidth: 412,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  
  scaleAsset: (size) => Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor)),

  gaps: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    separator: 32,
    section: 40,
    mlarge:14,
    Lsection: 50,
  },

  components: {
    inputHeight: 52,
    buttonHeight: 52,
    barMetricHeight: 12,
    infoMinHeight: 64,
    radiusInput: 12,
    radiusButton: 12,
    radiusSmall: 6,
    radiusBar: 4,
  },

  typography: {
    families: {
      light: 'Lexend-Light',
      regular: 'Lexend-Regular',
      medium: 'Lexend-Medium',
      semiBold: 'Lexend-SemiBold',
    },
    sizes: {
      title: 22,
      button: 18,
      body: 14,
      small: 12,
      subBody:13,
      subButton:16
    },
    lineHeights: {
      title: 28,
      body: 24,
      small: 20,
    },
  },
};