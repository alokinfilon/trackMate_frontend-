import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { Tokens } from '../theme/theme'; 

const GradientText = ({ text }) => {
  const fontSize = 12;
  const fontFamily = Tokens.typography.families.light;

  return (
    <View style={{ height: fontSize + 6, alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="100%" width="110">
        <Defs>
          <LinearGradient id="textGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <Stop offset="1.05%" stopColor="#FBB59E" />
            <Stop offset="32.02%" stopColor="#F8876C" />
            <Stop offset="56.43%" stopColor="#F16646" />
            <Stop offset="98.66%" stopColor="#F98F7A" />
          </LinearGradient>
        </Defs>
        <SvgText
          x="50%"
          y="75%"
          textAnchor="middle"
          fill="url(#textGrad)"
          fontSize={fontSize}
          fontFamily={fontFamily}
        >{text}</SvgText>
      </Svg>
    </View>
  );
};

export default GradientText;
