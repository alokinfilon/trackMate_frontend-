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




export const LIGHT_COLORS = {
  primary:        '#0A84FF',
  primaryDark:    '#0055CC',
  primaryLight:   '#3AA0FF',
  primaryGhost:   'rgba(10, 132, 255, 0.08)',
  primaryBorder:  'rgba(10, 132, 255, 0.18)',

  accent:         '#5E5CE6',
  accentLight:    '#7D7AFF',
  accentGhost:    'rgba(94, 92, 230, 0.10)',

  success:        '#30D158',
  successGhost:   'rgba(48, 209, 88, 0.10)',
  danger:         '#FF453A',
  dangerGhost:    'rgba(255, 69, 58, 0.08)',
  warning:        '#FF9F0A',
  warningGhost:   'rgba(255, 159, 10, 0.10)',

  bg:             '#F2F4F8',
  card:           '#FFFFFF',
  cardElevated:   '#FFFFFF',
  surface:        '#F7F8FA',
  border:         '#E8ECF2',
  divider:        '#F0F2F5',

  textPrimary:    '#0F172A',
  textSecondary:  '#64748B',
  textTertiary:   '#94A3B8',
  textOnPrimary:  '#FFFFFF',

  darkBg:         '#0F172A',
  darkCard:       '#1E293B',
  darkSurface:    '#334155',
};

export const DARK_COLORS = {
  primary:        '#0A84FF',
  primaryDark:    '#0055CC',
  primaryLight:   '#3AA0FF',
  primaryGhost:   'rgba(10, 132, 255, 0.15)',
  primaryBorder:  'rgba(10, 132, 255, 0.3)',

  accent:         '#5E5CE6',
  accentLight:    '#7D7AFF',
  accentGhost:    'rgba(94, 92, 230, 0.15)',

  success:        '#30D158',
  successGhost:   'rgba(48, 209, 88, 0.15)',
  danger:         '#FF453A',
  dangerGhost:    'rgba(255, 69, 58, 0.15)',
  warning:        '#FF9F0A',
  warningGhost:   'rgba(255, 159, 10, 0.15)',

  bg:             '#0F172A',
  card:           '#1E293B',
  cardElevated:   '#334155',
  surface:        '#1E293B',
  border:         '#334155',
  divider:        '#334155',

  textPrimary:    '#F8FAFC',
  textSecondary:  '#CBD5E1',
  textTertiary:   '#94A3B8',
  textOnPrimary:  '#FFFFFF',

  darkBg:         '#0F172A',
  darkCard:       '#1E293B',
  darkSurface:    '#334155',
};

export const COLORS = LIGHT_COLORS; 

export const GRADIENTS = {
  primary:      ['#32b3ef', '#478df0'],
  primaryShift: ['#34a2e6', '#35cff9'],
  accent:       ['#28d7f2', '#76d7fa'],
  warm:         ['#FF9F0A', '#FF6B35'],
  dark:         ['#1E293B', '#0F172A'],
  glass:        ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)'],
  cardShine:    ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
};

export const SHADOWS = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 32,
    elevation: 12,
  },
  glow: (color = '#0A84FF') => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  }),
};

export const RADIUS = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 36,
  pill: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT = {
  h1: { fontSize: 30, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  body: { fontSize: 15, fontWeight: '500', color: COLORS.textSecondary, lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '600', color: COLORS.textTertiary },
  label: { fontSize: 11, fontWeight: '700', color: COLORS.textTertiary, textTransform: 'uppercase', letterSpacing: 1.2 },
  button: { fontSize: 15, fontWeight: '800', color: COLORS.textOnPrimary },
};