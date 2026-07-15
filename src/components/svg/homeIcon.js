import * as React from "react"
import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg"

const HomeIcon = ({ focused, color = "#b8b8b8", ...props }) => {
  // Dynamically points to the linear gradient id when focused, otherwise uses regular color
  const strokeColor = focused ? "url(#homeGrad)" : color;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Defs>
        {/* Core 90.92deg active color gradient stop bounds */}
        <LinearGradient id="homeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="1.05%" stopColor="#FBB59E" />
          <Stop offset="32.02%" stopColor="#F8876C" />
          <Stop offset="56.43%" stopColor="#F16646" />
          <Stop offset="98.66%" stopColor="#F98F7A" />
        </LinearGradient>
      </Defs>

      {/* Inner door vector path */}
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      />
      
      {/* Outer house structure vector path */}
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
      />
    </Svg>
  );
};

export default HomeIcon;
