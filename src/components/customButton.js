import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tokens, NEU_SHADOWS } from '../theme/theme';

/**
 * CustomButton — Neumorphic Button
 * 
 * Variants:
 *  - 'primary': Accent violet bg (#6C63FF), white text
 *  - 'secondary': Same bg as surface (#E0E5EC), dark text, extruded shadow
 */
const CustomButton = ({
  title,
  onPress,
  colors: _unusedColors, // kept for backward compat, ignored
  activeOpacity = 0.9,
  textColor,
  fontSize = Tokens?.typography?.sizes?.body || 14,
  fontFamily = Tokens?.typography?.families?.medium || 'System',
  buttonStyle,
  textStyle,
  disabled = false,
  Icon,
  iconColor,
  iconPosition = 'left',
  variant = 'secondary',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? '#6C63FF' : '#E0E5EC';
  const resolvedTextColor = textColor || (isPrimary ? '#FFFFFF' : '#3D4852');
  const finalIconColor = iconColor || resolvedTextColor;
  const finalIconSize = 24;

  const shadowStyle = isPressed
    ? neuStyles.pressed
    : neuStyles.extruded;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.buttonWrapper,
        {
          backgroundColor: bgColor,
          transform: [{ translateY: isPressed ? 1 : 0 }],
        },
        !isPressed && shadowStyle,
        buttonStyle,
        disabled && styles.disabledButton,
      ]}
    >
      <View style={styles.contentRow}>
        {Icon && iconPosition === 'left' && (
          <View style={styles.leftIconSpace}>
            <Icon
              size={finalIconSize}
              color={String(finalIconColor)}
              strokeWidth={1.5}
            />
          </View>
        )}

        <Text
          style={[
            styles.buttonText,
            {
              color: resolvedTextColor,
              fontSize: fontSize,
              fontFamily: fontFamily,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>

        {Icon && iconPosition === 'right' && (
          <View style={styles.rightIconSpace}>
            <Icon
              size={finalIconSize}
              color={String(finalIconColor)}
              strokeWidth={1.5}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const neuStyles = {
  extruded: {
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  pressed: {
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // No border in neumorphism
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.5,
  },
  leftIconSpace: {
    marginRight: 8,
  },
  rightIconSpace: {
    marginLeft: 8,
  },
});

export default CustomButton;
