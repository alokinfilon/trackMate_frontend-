import { Dimensions, PixelRatio, Platform } from 'react-native';

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
    radiusInput: 16,
    radiusButton: 16,
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

// ─── Neumorphic Color Palette ───────────────────────────────────────
// Monochromatic "Cool Grey" with depth coming from shadow play

export const LIGHT_COLORS = {
  // Brand accent — soft violet
  primary:        '#6C63FF',
  primaryDark:    '#5A52E0',
  primaryLight:   '#8B84FF',
  primaryGhost:   'rgba(108, 99, 255, 0.10)',
  primaryBorder:  'rgba(108, 99, 255, 0.18)',

  // Secondary accent — teal
  accent:         '#38B2AC',
  accentLight:    '#4FD1C5',
  accentGhost:    'rgba(56, 178, 172, 0.10)',

  // Semantic
  success:        '#38B2AC',
  successGhost:   'rgba(56, 178, 172, 0.10)',
  danger:         '#E53E3E',
  dangerGhost:    'rgba(229, 62, 62, 0.08)',
  warning:        '#ED8936',
  warningGhost:   'rgba(237, 137, 54, 0.10)',

  // Neumorphic surfaces — ALL the same base color
  bg:             '#E0E5EC',
  card:           '#E0E5EC',
  cardElevated:   '#E0E5EC',
  surface:        '#E0E5EC',

  // Borders are TRANSPARENT in neumorphism — shadows define edges
  border:         'transparent',
  divider:        'rgba(163, 177, 198, 0.15)',

  // Typography — WCAG compliant
  textPrimary:    '#3D4852',   // 7.5:1 contrast on #E0E5EC
  textSecondary:  '#6B7280',   // 4.6:1 contrast (WCAG AA)
  textTertiary:   '#94A3B8',
  textOnPrimary:  '#FFFFFF',

  // Legacy compatibility
  darkBg:         '#2D3748',
  darkCard:       '#3D4852',
  darkSurface:    '#4A5568',
};

export const DARK_COLORS = {
  // Brand accent — same violet
  primary:        '#8B84FF',
  primaryDark:    '#6C63FF',
  primaryLight:   '#A5A0FF',
  primaryGhost:   'rgba(139, 132, 255, 0.15)',
  primaryBorder:  'rgba(139, 132, 255, 0.3)',

  // Secondary accent
  accent:         '#4FD1C5',
  accentLight:    '#76E4DA',
  accentGhost:    'rgba(79, 209, 197, 0.15)',

  // Semantic
  success:        '#4FD1C5',
  successGhost:   'rgba(79, 209, 197, 0.15)',
  danger:         '#FC8181',
  dangerGhost:    'rgba(252, 129, 129, 0.15)',
  warning:        '#F6AD55',
  warningGhost:   'rgba(246, 173, 85, 0.15)',

  // Neumorphic dark surfaces — darker monochromatic base
  bg:             '#2D3748',
  card:           '#2D3748',
  cardElevated:   '#3D4852',
  surface:        '#2D3748',

  // Still transparent/subtle in dark neumorphism
  border:         'transparent',
  divider:        'rgba(255, 255, 255, 0.06)',

  // Typography
  textPrimary:    '#E2E8F0',
  textSecondary:  '#A0AEC0',
  textTertiary:   '#718096',
  textOnPrimary:  '#FFFFFF',

  // Legacy
  darkBg:         '#1A202C',
  darkCard:       '#2D3748',
  darkSurface:    '#3D4852',
};

export const COLORS = LIGHT_COLORS; 

// ─── Gradients ──────────────────────────────────────────────────────

export const GRADIENTS = {
  primary:      ['#6C63FF', '#8B84FF'],
  primaryShift: ['#6C63FF', '#A5A0FF'],
  accent:       ['#38B2AC', '#4FD1C5'],
  warm:         ['#ED8936', '#F6AD55'],
  dark:         ['#2D3748', '#1A202C'],
  glass:        ['rgba(224,229,236,0.95)', 'rgba(224,229,236,0.85)'],
  cardShine:    ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
};

// ─── Neumorphic Shadows ─────────────────────────────────────────────
// The core visual DNA of the design system.
// React Native only supports a single shadow, so we use the DARK shadow
// as the primary and simulate the light highlight via nested Views or
// the NeuView component.

const NEU_SHADOW_LIGHT_COLOR = 'rgba(255, 255, 255, 0.5)';
const NEU_SHADOW_DARK_COLOR = 'rgb(163, 177, 198)';

const NEU_DARK_SHADOW_LIGHT_COLOR = 'rgba(255, 255, 255, 0.05)';
const NEU_DARK_SHADOW_DARK_COLOR = 'rgba(0, 0, 0, 0.4)';

export const NEU_SHADOWS = {
  // ── Light mode shadows ──
  light: {
    extruded: {
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 8,
    },
    extrudedHover: {
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 8, height: 8 },
      shadowOpacity: 0.7,
      shadowRadius: 20,
      elevation: 12,
    },
    extrudedSmall: {
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 4,
    },
    inset: {
      // Simulated via inner Views — flattened here for style merge
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    insetDeep: {
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    insetSmall: {
      shadowColor: NEU_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    // Inner shadow simulation colors (used by NeuView)
    innerDark: 'rgba(163, 177, 198, 0.6)',
    innerLight: 'rgba(255, 255, 255, 0.5)',
    innerDarkDeep: 'rgba(163, 177, 198, 0.7)',
    innerLightDeep: 'rgba(255, 255, 255, 0.6)',
  },

  // ── Dark mode shadows ──
  dark: {
    extruded: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      elevation: 8,
    },
    extrudedHover: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 8, height: 8 },
      shadowOpacity: 0.9,
      shadowRadius: 20,
      elevation: 12,
    },
    extrudedSmall: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      elevation: 4,
    },
    inset: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    insetDeep: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    insetSmall: {
      shadowColor: NEU_DARK_SHADOW_DARK_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    innerDark: 'rgba(0, 0, 0, 0.4)',
    innerLight: 'rgba(255, 255, 255, 0.05)',
    innerDarkDeep: 'rgba(0, 0, 0, 0.5)',
    innerLightDeep: 'rgba(255, 255, 255, 0.08)',
  },
};

// ─── Legacy SHADOWS export (for backward compat) ────────────────────

export const SHADOWS = {
  sm: NEU_SHADOWS.light.extrudedSmall,
  md: NEU_SHADOWS.light.extruded,
  lg: NEU_SHADOWS.light.extrudedHover,
  xl: NEU_SHADOWS.light.extrudedHover,
  glow: (color = '#6C63FF') => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  }),
};

// ─── Neumorphic Radius ──────────────────────────────────────────────
// "Hyper-rounded" as per design system

export const RADIUS = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 32,      // Neumorphic container/card radius
  pill: 999,
  // Neumorphic-specific aliases
  container: 32,
  button: 16,
  inner: 12,
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