import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * NeuView — Neumorphic Container Component
 * 
 * Renders a view with neumorphic dual-shadow depth effect.
 * 
 * Props:
 *  - variant: 'extruded' | 'extrudedSmall' | 'inset' | 'insetDeep' | 'insetSmall' | 'flat'
 *  - borderRadius: number (default: 32 for containers)
 *  - style: additional styles
 *  - children: child elements
 *  - innerStyle: additional styles for the inner container
 */
const NeuView = ({
  variant = 'extruded',
  borderRadius = 32,
  style,
  innerStyle,
  children,
}) => {
  const { colors, neuShadows } = useTheme();

  // Inset variants — simulate with inner shadow overlays
  if (variant === 'inset' || variant === 'insetDeep' || variant === 'insetSmall') {
    const isDeep = variant === 'insetDeep';
    const isSmall = variant === 'insetSmall';

    const darkColor = isDeep ? neuShadows.innerDarkDeep : neuShadows.innerDark;
    const lightColor = isDeep ? neuShadows.innerLightDeep : neuShadows.innerLight;
    const spread = isSmall ? 3 : isDeep ? 8 : 5;
    const blurRadius = isSmall ? 6 : isDeep ? 14 : 10;

    return (
      <View
        style={[
          {
            borderRadius,
            backgroundColor: colors.bg,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {/* Dark shadow overlay — bottom-right */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius,
              backgroundColor: 'transparent',
              borderWidth: spread,
              borderColor: darkColor,
              opacity: 0.5,
            },
          ]}
          pointerEvents="none"
        />
        {/* Light shadow overlay — top-left */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius,
              backgroundColor: 'transparent',
              borderTopWidth: spread,
              borderLeftWidth: spread,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderColor: lightColor,
            },
          ]}
          pointerEvents="none"
        />
        <View style={[{ flex: innerStyle?.flex !== undefined ? innerStyle.flex : undefined }, innerStyle]}>
          {children}
        </View>
      </View>
    );
  }

  // Extruded variants — use platform shadow
  const shadowStyle = variant === 'extrudedSmall'
    ? neuShadows.extrudedSmall
    : variant === 'extrudedHover'
    ? neuShadows.extrudedHover
    : variant === 'flat'
    ? {}
    : neuShadows.extruded;

  return (
    <View
      style={[
        {
          borderRadius,
          backgroundColor: colors.bg,
          ...shadowStyle,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default NeuView;
