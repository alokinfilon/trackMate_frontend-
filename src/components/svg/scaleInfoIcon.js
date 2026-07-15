import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ScaleInfoIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps your grid and calibration lines perfectly aligned
    fill="none"
    {...props}
  >
    <Defs>
      {/* 90.92deg is roughly equivalent to a horizontal left-to-right gradient */}
      <LinearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="1.05%" stopColor="#FDABAC" />
        <Stop offset="98.66%" stopColor="#FDEABF" />
      </LinearGradient>
    </Defs>

    <Path
      d="M12 15V11.986"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 15V11.986"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 6H4"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 8V4"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 8V4"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 15V11.986"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 12H4C3.44772 12 3 12.4477 3 13V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V13C21 12.4477 20.5523 12 20 12Z"
      stroke="url(#iconGradient)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ScaleInfoIcon;