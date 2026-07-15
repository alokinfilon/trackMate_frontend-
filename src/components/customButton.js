import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Tokens } from '../theme/theme';

const CustomButton = ({
  title,
  onPress,
  colors=['#ace9fd', '#bdedfd'],
  activeOpacity = 0.75,
  textColor = '#000000',
  fontSize = Tokens?.typography?.sizes?.body || 14,
  fontFamily = Tokens?.typography?.families?.light || 'System',
  buttonStyle,
  textStyle,
  disabled = false,
  Icon,
  iconColor,
  borderWidth= 1,
  borderColor= '#000000',
  iconPosition = 'left',
}) => {
  const finalIconColor = iconColor || '#ffffff';
  const finalIconSize = 28;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[
        styles.buttonWrapper,
        buttonStyle,
        disabled && styles.disabledButton,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0.01, y: 0.5 }}
        end={{ x: 0.99, y: 0.5 }}
        style={styles.gradientBg}
      >
        <View
          style={[
            styles.contentRow,
            iconPosition === 'right' && { flexDirection: 'row' },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            {Icon && (
              <View
                style={
                  iconPosition === 'left'
                    ? styles.leftIconSpace
                    : styles.rightIconSpace
                }
              >
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
                  color: textColor,
                  fontSize: fontSize,
                  fontFamily: fontFamily,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  gradientBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '600',
   color: '#000000',
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
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;
