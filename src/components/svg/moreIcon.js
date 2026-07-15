import * as React from "react"
import Svg, { Circle, LinearGradient, Stop, Defs } from "react-native-svg"

const MoreIcon = ({ focused, color, ...props }) => {
  const fillValue = focused ? "url(#iconGrad)" : color;

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Defs>
        <LinearGradient id="iconGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="1.05%" stopColor="#FBB59E" />
          <Stop offset="32.02%" stopColor="#F8876C" />
          <Stop offset="56.43%" stopColor="#F16646" />
          <Stop offset="98.66%" stopColor="#F98F7A" />
        </LinearGradient>
      </Defs>
      <Circle cx="5" cy="12" r="2" fill={fillValue} />
      <Circle cx="12" cy="12" r="2" fill={fillValue} />
      <Circle cx="19" cy="12" r="2" fill={fillValue} />
    </Svg>
  );
}

export default MoreIcon;
